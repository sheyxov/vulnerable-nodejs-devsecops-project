FROM node:18-alpine

# İş qovluğu
WORKDIR /usr/src/app

# Asılılıqları kopyala və install et
COPY package.json package-lock.json* ./
RUN npm install

# Bütün kodu kopyala
COPY . .

# Konteyner portu
EXPOSE 3000

# Serveri start et
CMD ["npm", "start"]
