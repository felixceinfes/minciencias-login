import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/ minciencias-login/
export default defineConfig({
  base:'/',
  plugins: [react()],
  server:{
    port: 3001,
    host: true
  }
})
