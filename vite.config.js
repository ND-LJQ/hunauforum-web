import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': resolve('.'),
    },
  },
});