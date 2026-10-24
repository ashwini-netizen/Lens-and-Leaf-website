import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'html-entry-resolver',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          // Ensure Vite always compiles from /src/main.jsx regardless of whether index.html has a production script tag
          return html.replace(
            /<script type="module" crossorigin src=".*?"><\/script>/,
            '<script type="module" src="/src/main.jsx"></script>'
          );
        }
      },
      closeBundle() {
        // Sync dist/index.html to root index.html and docs/index.html for static GitHub Pages hosting
        const distHtmlPath = path.resolve(__dirname, 'dist', 'index.html');
        if (fs.existsSync(distHtmlPath)) {
          const distHtml = fs.readFileSync(distHtmlPath, 'utf8');
          fs.writeFileSync(path.resolve(__dirname, 'index.html'), distHtml, 'utf8');
          fs.writeFileSync(path.resolve(__dirname, 'docs', 'index.html'), distHtml, 'utf8');
          console.log('✓ Successfully synchronized production bundles to index.html and docs/index.html');
        }
      }
    }
  ],
  server: {
    port: 5173,
    watch: {
      ignored: ['**/dist/**', '**/docs/**', '**/.git/**']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
