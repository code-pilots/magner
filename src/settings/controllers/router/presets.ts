import {
  PresetCardRoute,
  PresetEmptyRoute,
  PresetLoginRoute,
  PresetRoute,
  PresetTableRoute,
  RequiredPreset,
  SupportedRoutePresets,
} from 'settings/types/configs';
import loginConfig from 'configs/login';
import tableConfig from 'configs/table';
import cardConfig from 'configs/card';

const loginPreset: RequiredPreset<PresetLoginRoute> = {
  preset: 'login',
  layout: null,
  roles: null,
  config: loginConfig,

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
  config: tableConfig,

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
  config: cardConfig,

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
