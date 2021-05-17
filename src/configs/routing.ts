import { RoutingConfig } from 'settings/types/configs';

const routingConfig: RoutingConfig = {
  global: {
    homeNoAuthName: 'dashboard',
    homeHasAuthName: 'dashboard',
  },

  routes: [
    {
      /** Route with preset will have all other properties already set-up except roles
       *  If route has a preset, then its config is defined in 'configs/${preset}' file,
       *  and this config is passed as a prop 'config' to the view */
      preset: 'login',

      /** If 'roles' === null, no authorization needed */
      roles: null,
    },

    {
      /** Simple vue-router route config except that the 'component' is a path-string from 'views' directory */
      route: {
        name: 'dashboard',
        path: '/',

        /** Component is a view laying in the settings/views/pages directory,
         *  or the imported (or lazy imported with () => import()) component */
        component: 'home',

        /** Additional information about the route */
        meta: {},
      },

      /** An array of role Enums */
      roles: null,

      /** Path-string that specifies page layout */
      layout: null,

      /** Views accept configs as props to display everything according to those configs */
      config: '',
    },

    {
      route: {
        name: 'error',
        path: '/:pathMatch(.*)*',
        component: 'error',
      },
      roles: null,
      config: '',
    },
  ],
};

export default routingConfig;
