import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fresher_fista-2k25/' // repo name for GitHub Pages
})
