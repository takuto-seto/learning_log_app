import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // これがないとDocker外からブラウザで開けません
    port: 5173,
    watch: {
      usePolling: true, // Windows環境や一部の環境でファイルの変更を検知するために必要です
    },
  },
})