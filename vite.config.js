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
          // Clean out accumulated old production asset tags from previous builds
          let clean = html.replace(/<link rel="stylesheet"[^>]*href="\.?\/assets\/index-[^"]+\.css"[^>]*>/g, '');
          clean = clean.replace(/<script type="module"[^>]*src="\.?\/assets\/index-[^"]+\.js"[^>]*><\/script>/g, '');
          if (!clean.includes('/src/main.jsx')) {
            clean = clean.replace('</body>', '    <script type="module" src="/src/main.jsx"></script>\n  </body>');
          }
          return clean;
        }
      },
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        const docsDir = path.resolve(__dirname, 'docs');
        const rootAssetsDir = path.resolve(__dirname, 'assets');
        if (fs.existsSync(distDir)) {
          // Sync dist to docs/ for docs-based GitHub Pages
          fs.cpSync(distDir, docsDir, { recursive: true });

          // Sync dist/assets to root assets/ for root-based GitHub Pages
          const distAssets = path.resolve(distDir, 'assets');
          if (fs.existsSync(distAssets)) {
            fs.cpSync(distAssets, rootAssetsDir, { recursive: true });
          }

          // Sync dist/index.html to root index.html
          const distHtmlPath = path.resolve(distDir, 'index.html');
          if (fs.existsSync(distHtmlPath)) {
            const distHtml = fs.readFileSync(distHtmlPath, 'utf8');
            fs.writeFileSync(path.resolve(__dirname, 'index.html'), distHtml, 'utf8');
          }
          console.log('✓ Successfully synchronized production bundles to docs/, assets/, and index.html');
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
