import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Manual chunks for dependencies to optimize bundle size
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries (node_modules) into separate chunks
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    // Increase chunk size warning limit (default is 500 KB)
    chunkSizeWarningLimit: 1000, // Increase the limit to 1 MB or adjust as needed
  },
});
