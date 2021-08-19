import { routerController } from 'core/controllers';
import patientsConfig from 'configs/pages/patients/patients';
import patientConfig from 'configs/pages/patients/patient';
import loginPageConfig from 'configs/pages/login';
import consultationTypesTable from 'configs/pages/dictionaries/consultation-types/table';
import specializationTable from 'configs/pages/dictionaries/specializations/table';
import specializationConfig from 'configs/pages/dictionaries/specializations/card';
import bigtestConfig from 'configs/pages/big-test';
import formLayoutConfig from 'configs/pages/form-layout';
import { translate } from 'core/utils';

// eslint-disable-next-line no-shadow
export enum ROLE {
  ADMIN = 'ROLE_ADMINISTRATOR',
  SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  DOCTOR = 'ROLE_DOCTOR',
}

const router = routerController<ROLE>({
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

        /** Custom component that is passed to the vue router */
        component: () => import('app/pages/home.vue'),

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
      title: translate('pages.home'),

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

      roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],

      visible: true,
      title: translate('pages.patients'),
      icon: 'users',

      route: {
        /** In presets, you can redefine route params in this object */
        name: 'patients',
        path: '/patients',
      },
    },

    {
      preset: 'card',
      config: patientConfig,
      roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],

      visible: false,
      title: translate('pages.patient'),
      icon: '',

      route: {
        name: 'patient',
        path: '/patients/:id',
      },
    },

    {
      group: true,
      name: 'dicts',
      title: translate('pages.dictionaries'),
      icon: 'grid',
      routes: [
        {
          preset: 'table',
          config: specializationTable,
          roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],
          visible: true,
          title: translate('pages.specializations'),
          icon: 'grid',
          route: {
            name: 'specializations',
            path: '/specializations',
          },
        },
        {
          preset: 'card',
          config: specializationConfig,
          roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],

          visible: false,
          title: translate('pages.specialization'),
          icon: '',

          route: {
            name: 'specialization',
            path: '/specialization/:id',
          },
        },

        {
          preset: 'table',
          config: consultationTypesTable,
          roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],
          visible: true,
          title: translate('pages.consultation_types'),
          icon: 'grid',
          route: {
            name: 'consultation-types',
            path: '/consultation-types',
          },
        },
      ],
    },

    {
      preset: 'card',
      title: translate('pages.form_test'),
      icon: 'key',
      visible: true,
      roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],
      config: bigtestConfig,
      route: {
        path: '/big-test',
        name: 'bigtest',
      },
    },

    {
      preset: 'card',
      title: translate('pages.form_layout'),
      icon: 'layout',
      visible: true,
      roles: [ROLE.DOCTOR, ROLE.ADMIN, ROLE.SUPER_ADMIN],
      config: formLayoutConfig,
      route: {
        path: '/form-layout',
        name: 'form-layout',
      },
    },

    {
      route: {
        name: 'error',
        path: '/:pathMatch(.*)*',
        component: () => import('app/pages/error.vue'),
      },
      roles: null,
      config: {},
      visible: false,
    },
  ],
});

export default router;
