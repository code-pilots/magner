import { routerController, translate } from 'magner';
import loginPageConfig from 'features/login/login';
import addressConfig from 'features/addresses/address';
import addressesConfig from 'features/addresses/addresses';
import bigtestConfig from 'features/forms/form-example/form';
import formLayoutConfig from 'features/forms/layout-example/form';
import { ROLE } from '~/constants';

const router = routerController<ROLE>({
  global: {
    homeNoAuthName: 'login',
    homeHasAuthName: 'residents',
  },

  routes: [
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
      type: 'layout',
      layout: {
        layout: 'main',
        name: '',
        path: '/',
        props: {
          sidebarGroups: [
            {
              name: 'address-group',
              icon: () => import('assets/icons/map.svg'),
              title: translate('address.sidebar.group_title'),
              routes: ['address', 'addresses'],
            },
          ],
        },
        routes: [
          {
            type: 'custom',
            route: {
              path: '/',
              name: 'home',
              component: () => import('../features/home/home.vue'),
              roles: [ROLE.ADMIN],
              title: translate('address.sidebar.card_title'),
              visible: true,
              icon: () => import('../assets/icons/home.svg'),
            },
          },

          /** Addresses */
          {
            type: 'preset',
            preset: {
              preset: 'card',
              config: addressConfig,
            },
            route: {
              name: 'address',
              path: '/addresses/:id',
              link: '/addresses/new',
              roles: true,
              visible: true,
              title: translate('address.sidebar.card_title'),
            },
          },
          {
            type: 'preset',
            preset: {
              preset: 'table',
              config: addressesConfig,
            },
            route: {
              name: 'addresses',
              path: '/addresses',
              roles: true,
              visible: true,
              title: translate('address.sidebar.table_title'),
            },
          },

          /** Forms */
          {
            type: 'preset',
            route: {
              path: '/big-test',
              name: 'bigtest',
              title: translate('form_example.sidebar.card_title'),
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
              title: translate('layout_example.sidebar.card_title'),
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
