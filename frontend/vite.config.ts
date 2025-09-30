import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./components', import.meta.url)),
      '@/contexts': fileURLToPath(new URL('./contexts', import.meta.url)),
      '@/styles': fileURLToPath(new URL('./styles', import.meta.url)),
      '@/types': fileURLToPath(new URL('./types', import.meta.url)),
      '@/hooks': fileURLToPath(new URL('./hooks', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})