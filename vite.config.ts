import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 👇 Redirige las peticiones que empiecen con /api al backend .NET
      '/api': {
        target: 'http://localhost:5052', // ⚙️ el puerto que aparece en tu consola de "dotnet run"
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
