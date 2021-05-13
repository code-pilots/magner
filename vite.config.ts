import { defineConfig } from 'vite'; // eslint-disable-line
import vue from '@vitejs/plugin-vue'; // eslint-disable-line
import { VitePWA } from 'vite-plugin-pwa'; // eslint-disable-line
// @ts-ignore
import transformSvg from './src/transformSvg.js';
import manifest from './src/manifest';
import path from 'path';

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
    }
  },
});
