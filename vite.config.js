import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.jsx'),
      name: 'FeeloriChat', // attaches as window.FeeloriChat
      fileName: (format) => `feelori-chat-widget.${format}.js`,
      formats: ['umd'], // single file usable in browsers
    },
  },
})
