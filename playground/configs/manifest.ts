import { manifestController } from 'lib/index';

const manifest = manifestController({
  name: 'Magner',
  short_name: 'magner',
  display: 'standalone',
  background_color: '#6c6ee5',
  theme_color: '#fff',
  start_url: '/',
  icons: [
    {
      src: '/logo-light-192.png',
      sizes: '163x192',
      type: 'image/png',
    },
    {
      src: '/logo-light-512.png',
      sizes: '436x512',
      type: 'image/png',
    },
  ],
});

export default manifest;
