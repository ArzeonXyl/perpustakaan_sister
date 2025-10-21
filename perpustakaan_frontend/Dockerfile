# Gunakan Node
FROM node:20

WORKDIR /app

# Copy package.json dan install deps
COPY package*.json ./
RUN npm install

# Copy semua source code
COPY . .

# Expose port Vite default (5173)
EXPOSE 5173

# Jalankan dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
