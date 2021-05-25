import {
  PresetEmptyRoute,
  PresetLoginRoute,
  PresetRoute,
  PresetTableRoute,
  RequiredPreset,
  SupportedRoutePresets,
} from 'settings/types/configs';
import loginConfig from 'configs/login';
import routingConfig from 'configs/routing';
import tableConfig from 'configs/table';

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
    props: {
      globalRoutes: routingConfig.global,
    },
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
    props: {
      globalRoutes: routingConfig.global,
    },
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
};

export default allPresets;
