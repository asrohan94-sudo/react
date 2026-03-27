import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),          // ← Fixed: Must be inside the plugins array
  ],

  server: {
    port: 5173,
  },

  preview: {
    host: true,
    port: 4173,
    allowedHosts: [
      'examy-com.onrender.com',
      'react-xdcm.onrender.com',     // Current domain causing the error
      '.onrender.com',               // Safest: allows all *.onrender.com
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