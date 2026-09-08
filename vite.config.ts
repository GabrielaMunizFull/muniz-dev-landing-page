import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/muniz-dev-landing-page/',
  plugins: [preact()],
})
