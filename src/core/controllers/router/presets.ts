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
    component: 'login',
    props: {},
  },
};

const tablePreset: RequiredPreset<PresetTableRoute> = {
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
    component: 'table',
    props: {},
  },
};

const cardPreset: RequiredPreset<PresetCardRoute> = {
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
    component: 'card',
    props: {},
  },
};

const emptyPreset: RequiredPreset<PresetEmptyRoute> = {
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
    component: '',
  },
};

const allPresets: Record<SupportedRoutePresets, PresetRoute> = {
  login: loginPreset,
  empty: emptyPreset,
  table: tablePreset,
  card: cardPreset,
};

export default allPresets;
