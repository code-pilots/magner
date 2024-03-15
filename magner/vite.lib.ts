// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { transformSvg } from './lib/utils/helpers/transform-svg';

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
      entry: [
        path.resolve(__dirname, './lib/index.ts'),
        path.resolve(__dirname, './lib/vue-router.ts'),
        path.resolve(__dirname, './lib/element-plus.ts'),
      ],
      formats: ['es'],
      name: 'magner',
      fileName: (_, entryName) => `${entryName}.mjs`,
    },
    rollupOptions: {
      external: [
        '@editorjs/editorjs',
        '@editorjs/header',
        '@editorjs/list',
        '@editorjs/underline',
        'editorjs-strikethrough',
        'editorjs-table-readonly',
        'editorjs-text-color-plugin',
        'element-plus',
        'intl-tel-input',
        'maska',
        'vue',
        'vue-i18n',
        'vue-router',
        'vuex',
        'wretch',
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
