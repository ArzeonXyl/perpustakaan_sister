import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: '0.0.0.0',   // wajib, supaya Vite bisa diakses dari host
    port: 5173,        // port Vite
    strictPort: true,  // fail jika port 5173 sudah dipakai
    proxy: {
      '/api': {
        target: 'http://backend:3000', // nama service backend di Docker network
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://backend:3000', // AdminJS juga di backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
