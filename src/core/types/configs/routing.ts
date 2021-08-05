import {
  _RouteRecordBase,
  RouteComponent,
  RouteRecordRedirectOption,
} from 'vue-router';
import ROLE from 'configs/roles';
import { LoginConfig } from 'core/types/configs/login';
import { TableConfig } from 'core/types/configs/table';
import { CardConfig } from 'core/types/configs/card';

/** Global routing configuration that defines special needs in routing like programmatic navigation */
export interface GlobalRouting {
  homeNoAuthName: string,
  homeHasAuthName: string,
}

/**
 * Redefine Vue Router types to accept 'component' as a string
 * and extend their 'meta' field. Will be used by controllers mostly
 */

declare module 'vue-router' {
  interface RouteMeta {
    roles?: ROLE[] | null,
  }
}

type _RouteRecordProps = Record<string, any>;
interface RouteRecordSingleViewOverride extends _RouteRecordBase {
  name: string,
  component?: RouteComponent | (() => Promise<RouteComponent>),
  components?: never,
  props?: _RouteRecordProps,
}

interface RouteRecordRedirectOverride extends _RouteRecordBase {
  redirect: RouteRecordRedirectOption;
  component?: never;
  components?: never;
  props?: _RouteRecordProps,
}

export type Route = RouteRecordSingleViewOverride | RouteRecordRedirectOverride;

/**
 * Define custom routes to be used in configuration
 */
export interface BaseRoute {
  group?: false,
  layout?: 'main' | 'empty' | null | RouteComponent | (() => Promise<RouteComponent>),
  config?: Record<string, any>,
  roles: ROLE[] | null,

  visible?: boolean,
  title?: string,
  icon?: string,
}

export type SupportedRoutePresets = 'login'|'table'|'card'|'empty';

export interface PresetRoute extends BaseRoute {
  preset: SupportedRoutePresets,
  config?: Record<string, any>,
  route?: Route,
}

export interface PresetLoginRoute extends PresetRoute {
  preset: 'login',
  config?: LoginConfig,
  layout?: null,
  route?: {
    name: 'login',
    path: '/login',
    component?: RouteComponent | (() => Promise<RouteComponent>),
    props?: {
      config?: LoginConfig,
    },
  },
}

export interface PresetTableRoute extends PresetRoute {
  preset: 'table',
  config?: TableConfig,
  layout?: 'main'| 'empty' | null,
  route: {
    name: string,
    path: string,
    component?: RouteComponent | (() => Promise<RouteComponent>),
    props?: {
      config?: TableConfig,
    },
  },
}

export interface PresetCardRoute extends PresetRoute {
  preset: 'card',
  config?: CardConfig,
  layout?: 'main'| 'empty' | null,
  route: {
    name: string,
    path: string,
    component?: RouteComponent | (() => Promise<RouteComponent>),
    props?: {
      config?: CardConfig,
    },
  },
}

export interface PresetEmptyRoute extends PresetRoute {
  preset: 'empty',
  layout?: null,
  route?: {
    name: '',
    path: '',
    component?: RouteComponent | (() => Promise<RouteComponent>),
  }
}

export type RequiredPreset<T extends PresetRoute> = Required<T>;

export interface SimpleRoute extends BaseRoute {
  preset?: never,
  route: Route,
  config: Record<string, any>,
}

export type CustomRoute = SimpleRoute | PresetLoginRoute | PresetTableRoute | PresetCardRoute;

export interface GroupRoute {
  group: true,
  name: string,
  title: string,
  icon: string,
  routes: CustomRoute[],
}

export type RouteOrGroup = CustomRoute | GroupRoute;

export interface RoutingConfig {
  routes: RouteOrGroup[],
  global: GlobalRouting,
}
