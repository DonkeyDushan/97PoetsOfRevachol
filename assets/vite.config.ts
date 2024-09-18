import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
  publicDir: 'assets',
  resolve: {
    alias: {
      app: '/src/app',
    },
  },
});
