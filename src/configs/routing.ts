import type { RoutingConfig } from 'settings/types/configs';
import ROLE from 'configs/roles';
import usersConfig from 'configs/users';

const routingConfig: RoutingConfig = {
  global: {
    homeNoAuthName: 'login',
    homeHasAuthName: 'dashboard',
  },

  routes: [
    {
      /** Simple vue-router route config except that the 'component' is a path-string from 'views' directory */
      route: {
        /** Required name property as a unique route identifier  */
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
      config: {},

      /** Show the route in the sidebar or not */
      visible: true,

      /** Name displayed in the sidebar menu and in the header when active */
      title: 'Главная',

      /** Icon to be displayed in the sidebar */
      icon: 'home',
    },

    {
      /** Route with preset will have all other properties already set-up except roles
       *  If route has a preset, then its config is defined in 'configs/${preset}' file,
       *  and this config is passed as a prop 'config' to the view */
      preset: 'login',

      roles: null,
    },

    {
      preset: 'table',

      /** Redefine route config */
      config: usersConfig,

      roles: [ROLE.SUPER_ADMIN, ROLE.DOCTOR, ROLE.DOCTOR],

      visible: true,
      title: 'Пользователи',
      icon: 'users',

      route: {
        /** In presets, you can redefine route params in this object */
        name: 'users',
        path: '/users',
        component: 'table',
      },
    },

    {
      route: {
        name: 'error',
        path: '/:pathMatch(.*)*',
        component: 'error',
      },
      roles: null,
      config: {},
      visible: false,
    },
  ],
};

export default routingConfig;
