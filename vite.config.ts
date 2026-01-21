
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true // 开启此项，终端会显示局域网 IP，如 192.168.x.x
  }
});
