// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { transformSvg } from './lib/utils/transform-svg';

export default defineConfig({
  plugins: [
    vue(),
    transformSvg(),
    dts({
      include: 'lib/',
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './lib/index.ts'),
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
      lib: path.resolve(__dirname, 'lib'),
    },
  },
});
