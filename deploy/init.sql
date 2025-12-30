-- MySQL Database Schema for Vulnerable Web Application
-- Run this script to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS vulnerable_app;
USE vulnerable_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO users (username, password, email, role) VALUES 
    ('admin', 'admin123', 'admin@example.com', 'admin'),
    ('user1', 'password', 'user1@example.com', 'user'),
    ('testuser', 'test123', 'test@example.com', 'user'),
    ('pentester', 'test123', 'pentester@example.com', 'user')
ON DUPLICATE KEY UPDATE username = VALUES(username);

-- Insert sample posts
INSERT INTO posts (user_id, title, content) VALUES 
    (1, 'Welcome Post', 'Welcome to our vulnerable application!'),
    (2, 'Test Post', 'This is a test post from user1'),
    (1, 'Admin Announcement', 'Important security update coming soon...'),
    (3, 'User Experience', 'Great platform for testing!')
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Create indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at);

-- Display table information
SHOW TABLES;
DESCRIBE users;
DESCRIBE posts;
