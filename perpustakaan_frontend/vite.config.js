import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const targetBackend = env.VITE_BACKEND_BASE_URL;

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      host: '0.0.0.0',
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
        '/socket.io': {
          target: targetBackend,
          ws: true,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
