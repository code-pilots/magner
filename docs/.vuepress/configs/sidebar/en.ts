import type { SidebarConfig } from '@vuepress/theme-default';

export const en: SidebarConfig = {
  '/': [
    {
      text: 'Documentation',
      children: [
        '/readme.md',
        '/form.md',
        '/requests.md',
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
  ],
};
