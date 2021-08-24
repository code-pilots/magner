// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { transformSvg } from './src/core/utils/transform-svg';

export default defineConfig({
  plugins: [
    vue(),
    transformSvg(),
    dts(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/core/index.ts'),
      formats: ['es'],
      name: 'magner',
      fileName: 'magner',
    },
    rollupOptions: {
      external: [
        'vue', 'vue-router', 'vue-i18n', 'vuex', 'maska', 'element-plus',
        'editorjs-table', '@editorjs/editorjs', '@editorjs/header', '@editorjs/list',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    chunkSizeWarningLimit: 1024,
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src', 'app'),
      core: path.resolve(__dirname, 'src', 'core'),
      configs: path.resolve(__dirname, 'src', 'configs'),
      assets: path.resolve(__dirname, 'src', 'assets'),
      styles: path.resolve(__dirname, 'src', 'core', 'assets', 'styles'),
    },
  },
});
