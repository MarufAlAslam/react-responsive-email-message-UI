import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@shadcn/ui': path.resolve(path.dirname(new URL(import.meta.url).pathname), 'node_modules/@shadcn/ui')
    }
  },
  plugins: [react(), tailwindcss(),],
})
