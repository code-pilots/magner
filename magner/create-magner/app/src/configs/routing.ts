import { routerController, translate } from 'magner';
import loginPageConfig from 'features/login/login';
import addressConfig from 'features/addresses/address';
import addressesConfig from 'features/addresses/addresses';
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
