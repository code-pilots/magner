import { Route } from 'lib/types/configs/routing/routing';
import { SupportedRoutePresets } from 'lib/types/configs/routing/routing-presets';

const loginPreset: Route = {
  path: '/login',
  name: 'login',
  component: () => import('../../views/pages/login.vue'),
};

const tablePreset: Route = {
  path: '/table',
  name: 'table',
  component: () => import('../../views/pages/table.vue'),
  roles: true,
};

const cardPreset: Route = {
  path: '/card/:id',
  name: 'card',
  component: () => import('../../views/pages/card.vue'),
  roles: true,
};

const errorPreset: Route = {
  path: '/:pathMatch(.*)*',
  name: 'error',
  component: () => import('../../views/pages/404.vue'),
};

const allPresets: Record<SupportedRoutePresets, Route> = {
  login: loginPreset,
  table: tablePreset,
  404: errorPreset,
  card: cardPreset,
};

export default allPresets;
