// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { transformSvg } from './lib/utils/transform-svg';

export default defineConfig({
  plugins: [
    vue(),
    transformSvg(),
  ],
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'lib'),
      styles: path.resolve(__dirname, 'playground', 'assets', 'styles'),
    },
  },
  server: {
    port: parseInt(process.env.PORT || '8080', 10),
  },
  build: {
    chunkSizeWarningLimit: 1024,
  },
});
