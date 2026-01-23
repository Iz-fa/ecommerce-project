import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler', { target: '19' }]],
    },
  })],
  server: {
    proxy: {
      '/api': {  //this means if the url starts with /api, it will automaticaly go to the target
        target: 'http://localhost:3000'
      },
      '/images': {
        target: 'http://localhost:3000'
      }
    }
  },
  build: {
    outDir: '../ecommerce-backend/dist'
  }
})
