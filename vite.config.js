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
        // Sync dist to root index.html and docs folder for static GitHub Pages hosting
        const distDir = path.resolve(__dirname, 'dist');
        const docsDir = path.resolve(__dirname, 'docs');
        if (fs.existsSync(distDir)) {
          fs.cpSync(distDir, docsDir, { recursive: true });
          const distHtmlPath = path.resolve(distDir, 'index.html');
          if (fs.existsSync(distHtmlPath)) {
            const distHtml = fs.readFileSync(distHtmlPath, 'utf8');
            fs.writeFileSync(path.resolve(__dirname, 'index.html'), distHtml, 'utf8');
          }
          console.log('✓ Successfully synchronized production bundles to docs/ and index.html');
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
