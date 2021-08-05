import type {
  CardConfig,
  LoginConfig,
  TableConfig,
  PresetCardRoute,
  PresetEmptyRoute,
  PresetLoginRoute,
  PresetRoute,
  PresetTableRoute,
  RequiredPreset,
  SupportedRoutePresets,
} from 'core/types/configs';

const loginPreset: RequiredPreset<PresetLoginRoute> = {
  group: false,
  preset: 'login',
  layout: null,
  roles: null,
  config: {} as LoginConfig,

  visible: false,
  icon: '',
  title: 'Вход',

  route: {
    name: 'login',
    path: '/login',
    component: () => import('../../views/pages/login.vue'),
    props: {},
  },
};

const tablePreset: RequiredPreset<PresetTableRoute> = {
  group: false,
  preset: 'table',
  layout: 'main',
  roles: null,
  config: {} as TableConfig,

  visible: true,
  icon: 'grid',
  title: 'Таблица',

  route: {
    name: 'table',
    path: '/table',
    component: () => import('../../views/pages/table.vue'),
    props: {},
  },
};

const cardPreset: RequiredPreset<PresetCardRoute> = {
  group: false,
  preset: 'card',
  layout: 'main',
  roles: null,
  config: {} as CardConfig,

  visible: false,
  icon: '',
  title: 'Карточка',

  route: {
    name: 'card',
    path: '/card/:id',
    component: () => import('../../views/pages/card.vue'),
    props: {},
  },
};

const emptyPreset: RequiredPreset<PresetEmptyRoute> = {
  group: false,
  preset: 'empty',
  layout: null,
  roles: null,
  config: {},

  visible: true,
  icon: '',
  title: '',

  route: {
    name: '',
    path: '',
  },
};

const allPresets: Record<SupportedRoutePresets, PresetRoute> = {
  login: loginPreset,
  empty: emptyPreset,
  table: tablePreset,
  card: cardPreset,
};

export default allPresets;
