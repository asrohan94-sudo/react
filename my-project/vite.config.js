import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Theme/animations belong in tailwind.config.js, NOT here
  // Remove the invalid 'theme' block from vite.config.js

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,                    // Optional: explicit preview port
    host: true,                    // Listen on all interfaces
    allowedHosts: [
      'examy-com.onrender.com',
      '.onrender.com',             // Allows all *.onrender.com subdomains
      'localhost',
      '127.0.0.1'
    ]
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})