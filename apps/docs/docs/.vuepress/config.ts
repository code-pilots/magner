import { defineUserConfig, defaultTheme } from 'vuepress';
import { sidebar, navbar } from './configs';

export default defineUserConfig({
  base: '/magner/',
  lang: 'en',
  title: 'Magner',
  description: 'Universal Admin panel that is magnetic to any backend',

  theme: defaultTheme({
    logo: '/cp.jpeg',
    repo: 'code-pilots/magner',
    docsDir: 'docs',
    locales: {
      '/': {
        navbar: navbar.en,
        sidebar: sidebar.en,
        editLinkText: 'Edit this page on GitHub',
      },
    },
  }),

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '112x128',
        href: `/magner/logo-light-128.png`,
      },
    ],
    ['link', { rel: 'apple-touch-icon', href: `/magner/logo-light-128.png` }],

    ['meta', { name: 'title', content: 'Magner' }],
    ['meta', { name: 'author', content: 'Code Pilots (https://code-pilots.com/)' }],
    ['meta', { name: 'application-name', content: 'Magner' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Magner' }],
    ['meta', { name: 'description', content: 'Universal admin panel magnetic to any backend. Supports authentication, role management, entities view, creation, edition and deletion. I18n, infinitely nested layout and custom components – use packed tools to make the best admin dashboards in an hour!' }],
    ['meta', { name: 'keywords', content: 'magner, admin, magnetic admin, admin panel, admin dashboard, universal admin, vue, javascript, typescript, element-ui' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://code-pilots.github.io/magner/' }],
    ['meta', { property: 'og:title', content: 'Magner' }],
    ['meta', { property: 'og:description', content: 'Universal admin panel magnetic to any backend. Supports authentication, role management, entities view, creation, edition and deletion. I18n, infinitely nested layout and custom components – use packed tools to make the best admin dashboards in an hour!' }],
    ['meta', { property: 'og:image', content: 'https://code-pilots.github.io/magner/assets/screen.fd58f4b6.png' }],

    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Magner' }],
    ['meta', { name: 'twitter:description', content: 'Universal admin panel magnetic to any backend. Supports authentication, role management, entities view, creation, edition and deletion. I18n, infinitely nested layout and custom components – use packed tools to make the best admin dashboards in an hour!' }],
    ['meta', { name: 'twitter:image', content: 'https://code-pilots.github.io/magner/assets/screen.fd58f4b6.png' }],
  ],
});
