# Stage 1 - Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

# [PENTING] Copy file .env agar variabel terbaca oleh Vite saat build
COPY .env .env

RUN npm run build

# Stage 2 - Serve
FROM nginx:alpine

# [PENTING] Timpa config default nginx dengan config custom kita (yang ada proxy backend)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]