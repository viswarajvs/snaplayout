import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  "baseUrl": "./",
  base: '/snaplayout-ui/',
  plugins: [react()],
  paths: {
    "@/*": ["src/*"]
  },
  resolveJsonModule: true,
  resolve: {
    alias: {
      '@styles': '/src/styles',  // Alias for styles folder
      '@': path.resolve(__dirname, './src'),  // Alias for src folder
      '@components': '/src/components',  // Alias for components folder
      'jwt-decode': 'jwt-decode/dist/jwt-decode.cjs.js',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@styles/variables.scss" as *;', // Use alias in SCSS files with @use
      }
    }
  }
})
