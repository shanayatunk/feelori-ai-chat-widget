import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      // We are now building from our new embed file
      entry: path.resolve(__dirname, 'src/embed.jsx'),
      name: 'FeeloriChat',
      fileName: (format) => `feelori-chat-widget.embed.${format}.js`,
      formats: ['umd'],
    },
  },
})