import { routerController } from 'core/controllers';
import ROLE from 'configs/roles';
import patientsConfig from 'configs/pages/patients/patients';
import patientConfig from 'configs/pages/patients/patient';
import loginPageConfig from 'configs/pages/login';

const router = routerController({
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

        /** Component is a view laying in the core/views/pages directory,
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

      config: loginPageConfig,

      roles: null,
    },

    {
      preset: 'table',

      /** Redefine route config */
      config: patientsConfig,

      roles: [ROLE.SUPER_ADMIN, ROLE.DOCTOR, ROLE.DOCTOR],

      visible: true,
      title: 'Пациенты',
      icon: 'users',

      route: {
        /** In presets, you can redefine route params in this object */
        name: 'patients',
        path: '/patients',
        component: 'table',
      },
    },

    {
      preset: 'card',
      config: patientConfig,
      roles: [ROLE.SUPER_ADMIN, ROLE.DOCTOR, ROLE.DOCTOR],

      visible: false,
      title: 'Пациент',
      icon: '',

      route: {
        name: 'patient',
        path: '/patients/:id',
        component: 'card',
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
});

export default router;
