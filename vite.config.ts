import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000, // Use a different port
    host: true, // Enable listening on all network interfaces
  },
});
