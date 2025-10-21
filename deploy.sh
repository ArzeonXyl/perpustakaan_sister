#!/bin/bash

# Masuk ke direktori project utama
cd /opt/perpustakaan

# Tarik update terbaru dari branch 'main' (ganti jika perlu)
echo "Menarik update dari Git..."
git pull origin main

# Update & Restart Backend
echo "Memperbarui Backend..."
cd perpustakaan_backend
docker compose -f backend-compose.yml down
docker compose -f backend-compose.yml up -d --build
echo "Backend diperbarui."
cd .. # Kembali ke direktori utama

# Update & Restart Frontend
echo "Memperbarui Frontend..."
cd perpustakaan_frontend
docker compose -f frontend-compose.yml down
docker compose -f frontend-compose.yml up -d --build
echo "Frontend diperbarui."
cd .. # Kembali ke direktori utama

# (Opsional) Jalankan migrasi atau perintah backend lain jika perlu
# echo "Menjalankan migrasi database..."
# docker compose -f perpustakaan_backend/backend-compose.yml exec backend node your-migration-script.js --force

echo "Deploy selesai!"
