import { routerController, translate } from 'core/index';
import patientsConfig from 'configs/pages/patients/patients';
import loginPageConfig from 'configs/pages/login';
import bigtestConfig from 'configs/pages/big-test';
import formLayoutConfig from 'configs/pages/form-layout';

// eslint-disable-next-line no-shadow
export enum ROLE {
  SAMPLE = 'SAMPLE'
}

const router = routerController<ROLE>({
  global: {
    homeNoAuthName: '',
    homeHasAuthName: 'dashboard',
  },

  routes: [
    {
      route: {
        name: 'dashboard',
        path: '/',
        component: () => import('app/pages/home.vue'),
        meta: {},
      },
      roles: [ROLE.SAMPLE],
      layout: 'main',
      config: {},
      visible: true,
      title: translate('pages.home'),
      icon: 'home',
    },

    {
      preset: 'login',
      config: loginPageConfig,
      roles: null,
    },

    {
      preset: 'table',
      config: patientsConfig,
      roles: null,
      visible: true,
      title: translate('pages.patients'),
      icon: 'users',
      route: {
        name: 'patients',
        path: '/patients',
      },
    },

    {
      preset: 'card',
      title: translate('pages.form_test'),
      icon: 'key',
      visible: true,
      roles: null,
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
      roles: null,
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
