// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { transformSvg } from './src/utils/transform-svg';

export default defineConfig({
  plugins: [
    vue(),
    transformSvg(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      configs: path.resolve(__dirname, 'src', 'configs'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      features: path.resolve(__dirname, 'src', 'features'),
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
});
