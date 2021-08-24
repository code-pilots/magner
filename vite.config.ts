// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';
import { transformSvg } from './src/core/utils/transform-svg';

export default defineConfig({
  plugins: [
    vue(),
    transformSvg(),
    // VitePWA({
    //   workbox: {},
    // }),
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src', 'app'),
      core: path.resolve(__dirname, 'src', 'core'),
      configs: path.resolve(__dirname, 'src', 'configs'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      styles: path.resolve(__dirname, 'src', 'core', 'assets', 'styles'),
    },
  },
  server: {
    port: parseInt(process.env.PORT || '8080', 10),
  },
  build: {
    chunkSizeWarningLimit: 1024,
  },
});
