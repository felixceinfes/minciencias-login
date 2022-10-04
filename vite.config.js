import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/minciencias-login/',
  plugins: [react()],
  server:{
    port: 3001,
    host: true
  }
})
