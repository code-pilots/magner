import {
  PresetEmptyRoute,
  PresetLoginRoute,
  PresetRoute,
  SupportedRoutePresets,
} from 'settings/types';

const loginPreset: Required<PresetLoginRoute> = {
  preset: 'login',
  config: 'login',
  layout: null,
  roles: null,
  route: {
    name: 'login',
    path: '/login',
    component: 'login',
  },
};

const emptyPreset: Required<PresetEmptyRoute> = {
  preset: 'empty',
  config: '',
  layout: null,
  roles: null,
  route: {
    name: '',
    path: '',
    component: '',
  },
};

const allPresets: Record<SupportedRoutePresets, PresetRoute> = {
  login: loginPreset,
  empty: emptyPreset,
};

export default allPresets;
