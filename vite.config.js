import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // THIS IS THE NEW AND IMPORTANT PART
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.jsx'),
      name: 'FeeloriChat',
      fileName: (format) => `feelori-chat-widget.${format}.js`,
      formats: ['umd'] // Universal Module Definition
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  }
})