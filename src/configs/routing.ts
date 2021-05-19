import { RoutingConfig } from 'settings/types/configs';
import ROLE from 'configs/roles';

const routingConfig: RoutingConfig = {
  global: {
    homeNoAuthName: 'login',
    homeHasAuthName: 'dashboard',
  },

  routes: [
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

      /** An array of role Enums. If 'roles' === null, no authorization needed */
      roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],

      /** Path-string (from layouts folder) that specifies page layout */
      layout: 'main',

      /** Views accept configs as props to display everything according to those configs */
      config: '',
    },

    {
      /** Route with preset will have all other properties already set-up except roles
       *  If route has a preset, then its config is defined in 'configs/${preset}' file,
       *  and this config is passed as a prop 'config' to the view */
      preset: 'login',

      roles: null,
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
