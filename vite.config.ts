import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// @ts-ignore
import transformSvg from './src/transformSvg.js';
import manifest from './src/configs/manifest';

export default defineConfig({
  plugins: [
    vue(),
    transformSvg(),
    VitePWA({
      manifest,
      workbox: {},
    }),
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src', 'app'),
      core: path.resolve(__dirname, 'src', 'core'),
      configs: path.resolve(__dirname, 'src', 'configs'),
      styles: path.resolve(__dirname, 'src', 'core', 'assets', 'styles'),
    },
  },
  server: {
    port: parseInt(process.env.PORT || '8080', 10),
  },
});
