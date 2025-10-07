import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // backend Express
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://localhost:3000', // AdminJS juga di backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});