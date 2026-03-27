import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
  },

  preview: {
    host: true,
    port: 4173,
    allowedHosts: [
      'examy-com.onrender.com',        // ← Your previous domain
      'react-xdcm.onrender.com',       // ← New domain causing the error
      '.onrender.com',                 // ← Allows ALL *.onrender.com subdomains (Recommended)
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