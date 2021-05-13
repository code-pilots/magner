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
      settings: path.resolve(__dirname, 'src', 'settings'),
      configs: path.resolve(__dirname, 'src', 'configs'),
      styles: path.resolve(__dirname, 'src', 'settings', 'assets', 'styles'),
    },
  },
});
