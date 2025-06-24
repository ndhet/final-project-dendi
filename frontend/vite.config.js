import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
        host: 'penjualan.goprofit.id',
        protocol: 'wss',
    },
    cors: true,
    fs: {
      allow: ['..'],
    },
    allowedHosts: [
      'penjualan.goprofit.id',
      'localhost',
      '127.0.0.1',
    ]
  }
});
