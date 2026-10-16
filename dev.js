import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌿 Starting Lens & Leaf Full-Stack Photography Studio Environment...\n');

const nodeExec = process.execPath;

// Start Express Backend
const serverScript = path.join(__dirname, 'server', 'server.js');
const serverProcess = spawn(nodeExec, [serverScript], {
  stdio: 'inherit',
  cwd: __dirname
});

// Start Vite Frontend
const viteScript = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
const clientProcess = spawn(nodeExec, [viteScript], {
  stdio: 'inherit',
  cwd: __dirname
});

const cleanup = () => {
  console.log('\n🌿 Gracefully shutting down Lens & Leaf studio servers...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
