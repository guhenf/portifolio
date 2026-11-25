import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' faz o build funcionar em qualquer caminho (GitHub Pages, Vercel, Netlify)
export default defineConfig({
  plugins: [react()],
  base: './',
})
