/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { // Vitest configuration
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
