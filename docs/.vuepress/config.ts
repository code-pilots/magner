import { defineUserConfig } from '@vuepress/cli';
import type { DefaultThemeOptions } from '@vuepress/theme-default';
import { sidebar } from './configs';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  lang: 'en',
  title: 'Magner',
  description: 'Universal Admin panel that is magnetic to any backend',

  bundler: '@vuepress/vite',
  bundlerConfig: {},

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    locales: {
      '/': {
        sidebar: sidebar.en,
        editLinkText: 'Edit this page on GitHub',
      },
    },
  },
});
