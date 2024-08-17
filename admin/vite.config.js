import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080 // Thay 8080 bằng số cổng mà bạn muốn sử dụng
  }
})
