const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// MySQL connection configuration via environment variables (with defaults)
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'appuserpass',
  database: process.env.DB_NAME || 'vulnerable_app',
  port: Number(process.env.DB_PORT) || 3306
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database successfully!');
    connection.release();
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    process.exit(1);
  }
}

// Initialize database connection
testConnection();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'vulnerable-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Vulnerable SQL query - intentionally vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
  console.log('Executing query:', query); // For debugging/demonstration
  
  try {
    const [rows] = await pool.execute(query);
    
    if (rows.length > 0) {
      const user = rows[0];
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      res.redirect('/dashboard');
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.render('login', { error: 'Database error occurred' });
  }
});

app.get('/dashboard', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  
  try {
    // Get user posts
    const [posts] = await pool.execute(
      "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC", 
      [req.session.user.id]
    );
    
    res.render('dashboard', { user: req.session.user, posts: posts });
  } catch (error) {
    console.error('Database error:', error);
    res.render('dashboard', { user: req.session.user, posts: [] });
  }
});

app.post('/update-profile', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  
  const { email, bio } = req.body;
  
  try {
    // Update user email in database
    await pool.execute(
      "UPDATE users SET email = ? WHERE id = ?", 
      [email, req.session.user.id]
    );
    
    req.session.user.email = email;
    req.session.user.bio = bio; // No sanitization!
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Database error:', error);
    res.redirect('/dashboard');
  }
});

app.post('/create-post', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  
  const { title, content } = req.body;
  
  try {
    // Insert post without sanitization
    await pool.execute(
      "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)", 
      [req.session.user.id, title, content]
    );
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Database error:', error);
    res.redirect('/dashboard');
  }
});

app.get('/posts', async (req, res) => {
  try {
    const [posts] = await pool.execute(`
      SELECT posts.*, users.username 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      ORDER BY created_at DESC
    `);
    
    res.render('posts', { posts: posts, user: req.session.user });
  } catch (error) {
    console.error('Database error:', error);
    res.render('posts', { posts: [], user: req.session.user });
  }
});

app.get('/admin', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    res.status(403).send('Access denied. Admin only.');
    return;
  }
  
  try {
    const [users] = await pool.execute("SELECT * FROM users");
    res.render('admin', { users: users, user: req.session.user });
  } catch (error) {
    console.error('Database error:', error);
    res.render('admin', { users: [], user: req.session.user });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await pool.end();
  process.exit(0);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App Listening at http://0.0.0.0:${port}`);
});
