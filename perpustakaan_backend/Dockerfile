# backend Dockerfile
FROM node:20

WORKDIR /app

# Copy package.json & package-lock.json dulu
COPY package*.json ./

# Install deps di container
RUN npm install

# Copy sisa source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
