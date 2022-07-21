import type { SidebarConfig } from 'vuepress';

export const en: SidebarConfig = {
  '/': [
    {
      text: 'Introduction',
      children: [
        '/readme.md',
        '/get-started.md',
        '/contributors.md',
      ],
    },

    {
      text: 'Configuration',
      children: [
        '/configuration/readme.md',
        '/configuration/manifest.md',
        '/configuration/routing.md',
        '/configuration/development.md',
        '/configuration/i18n.md',
      ],
    },

    {
      text: 'Utilities',
      children: [
        '/docs/form.md',
        '/docs/requests.md',
      ],
    },
  ],

  '/api/': [
    {
      text: '',
      children: [
        '/api/readme.md',
      ],
    },
  ],
};
