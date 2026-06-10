import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   base: '/OER-Auth-Module/',  // اسم المستودع
  plugins: [react(),tailwindcss()],
})
