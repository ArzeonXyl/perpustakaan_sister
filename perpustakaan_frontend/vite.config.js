import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

// 👇 GANTI BAGIAN INI SAJA 👇
const IS_DOCKER = false; // Ubah ke true jika pakai Docker
// 👆 --------------------- 👆

// Logika otomatis memilih target
const targetBackend = IS_DOCKER ? 'http://backend:3000' : 'http://localhost:3000';

console.log(`🔌 Mode: ${IS_DOCKER ? 'Docker' : 'Localhost'}`);
console.log(`🎯 Proxy Target: ${targetBackend}`);

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: '0.0.0.0',   // Tetap 0.0.0.0 supaya aman untuk keduanya
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: targetBackend,
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: targetBackend,
        changeOrigin: true,
        secure: false,
      },
      // Tambahkan ini supaya Socket.IO tidak error
      '/socket.io': {
        target: targetBackend,
        ws: true,
        changeOrigin: true,
        secure: false,
      }
    },
  },
});