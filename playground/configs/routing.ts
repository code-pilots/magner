import { routerController, translate } from 'lib/index';
import patientsConfig from './pages/patients/patients';
import loginPageConfig from './pages/login';
import bigtestConfig from './pages/big-test';
import formLayoutConfig from './pages/form-layout';
import PatientsIcon from '../assets/icons/users.svg';

// eslint-disable-next-line no-shadow
export enum ROLE {
  SAMPLE = 'SAMPLE'
}

const router = routerController<ROLE>({
  global: {
    homeNoAuthName: 'login',
    homeHasAuthName: 'dashboard',
  },

  routes: [
    {
      type: 'custom',
      route: {
        path: '/',
        name: 'dashboard',
        component: () => import('../app/pages/home.vue'),
        roles: [ROLE.SAMPLE],
        layout: 'main',
        visible: true,
        title: translate('pages.home'),
        icon: () => import('../assets/icons/home.svg'),
      },
    },

    {
      type: 'preset',
      route: {
        path: '/login',
        name: 'login',
      },
      preset: {
        preset: 'login',
        config: loginPageConfig,
      },
    },

    {
      type: 'preset',
      route: {
        path: '/patients',
        name: 'patients',
        visible: true,
        title: translate('pages.patients'),
        icon: () => PatientsIcon,
      },
      preset: {
        preset: 'table',
        config: patientsConfig,
      },
    },

    {
      type: 'group',
      name: 'nested',
      title: translate('pages.nested'),
      icon: () => import('../assets/icons/grid.svg'),
      routes: [
        {
          type: 'preset',
          route: {
            path: '/big-test',
            name: 'bigtest',
            title: translate('pages.form_test'),
            icon: () => import('../assets/icons/key.svg'),
            visible: true,
          },
          preset: {
            preset: 'card',
            config: bigtestConfig,
          },
        },

        {
          type: 'preset',
          route: {
            path: '/form-layout',
            name: 'form-layout',
            title: translate('pages.form_layout'),
            icon: () => import('../assets/icons/layout.svg'),
            visible: true,
          },
          preset: {
            preset: 'card',
            config: formLayoutConfig,
          },
        },
      ],
    },

    {
      type: 'preset',
      route: {
        path: '/:pathMatch(.*)*',
        name: 'error',
      },
      preset: {
        preset: '404',
        config: {},
      },
    },
  ],
});

export default router;
