import { manifestController } from 'core/controllers';

const manifest = manifestController({
  name: 'Magner',
  short_name: 'magner',
  display: 'standalone',
  background_color: '#6c6ee5',
  theme_color: '#fff',
  start_url: '/',
  icons: [
    {
      src: '/logo-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/logo-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
});

export default manifest;
