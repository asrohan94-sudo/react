import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // ✅ remove risky babel plugin
    tailwindcss(),
  ],

  server: {
    host: '0.0.0.0',
    port: 5173, // dev only
  },

  preview: {
    host: '0.0.0.0',
    port: 10000, // ✅ Render port
  },
})