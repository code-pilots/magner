import { RoutingConfig } from 'settings/types';

const routingConfig: RoutingConfig = {
  routes: [
    {
      /** Short name of the route without dashes (-) and spaces */
      name: 'example',

      /** URL of the route */
      path: '/example',

      /** Has to be a path from the 'views' directory */
      component: 'pages/home.vue',

      /** Additional information about the route */
      meta: {},
    },

    {
      name: 'home',
      path: '/',
      component: 'pages/home.vue',
    },
    {
      name: 'error',
      path: '/:pathMatch(.*)*',
      component: 'pages/error.vue',
    },
  ],
};

export default routingConfig;
