import {
  _RouteRecordBase,
  RouteComponent,
  RouteRecordRedirectOption,
} from 'vue-router';
import type { LoginConfig } from './pages/login';
import type { TableConfig } from './pages/table';
import type { CardConfig } from './pages/card';
import type { TranslateData } from '../../utils/core/translate';
import type { IconImport } from '../utils/useful';

/** Global routing configuration that defines special needs in routing like programmatic navigation */
export interface GlobalRouting {
  /** Name of the route to which should we redirect unauthenticated user from protected route */
  homeNoAuthName: string,
  /** Name of the route to which should we redirect authenticated user from unprotected route */
  homeHasAuthName: string,
}

/**
 * Redefine Vue Router types to accept 'component' as a string
 * and extend their 'meta' field. Will be used by controllers mostly
 */

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[] | null,
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
export interface BaseRoute<ROLE extends string = string> {
  group?: false,
  layout?: 'main' | 'empty' | null | RouteComponent | (() => Promise<RouteComponent>),
  config?: Record<string, any>,
  roles: ROLE[] | null,

  visible?: boolean,
  title?: TranslateData,
  icon?: IconImport,
}

export type SupportedRoutePresets = 'login'|'table'|'card'|'404'|'empty';

export interface PresetRoute<ROLE extends string = string> extends BaseRoute<ROLE> {
  preset: SupportedRoutePresets,
  config?: Record<string, any>,
  route?: Route,
}

export interface PresetLoginRoute<ROLE extends string = string> extends PresetRoute<ROLE> {
  preset: 'login',
  config?: LoginConfig,
  layout?: null,
  route?: {
    name: 'login' | string,
    path: '/login' | string,
    component?: RouteComponent | (() => Promise<RouteComponent>),
    props?: {
      config?: LoginConfig,
    },
  },
}

export interface PresetTableRoute<ROLE extends string = string> extends PresetRoute<ROLE> {
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

export interface PresetCardRoute<ROLE extends string = string> extends PresetRoute<ROLE> {
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

export interface PresetErrorRoute<ROLE extends string = string> extends PresetRoute<ROLE> {
  preset: '404',
  layout?: null,
  route?: {
    name: 'error',
    path: '/:pathMatch(.*)*',
    component?: RouteComponent | (() => Promise<RouteComponent>),
    props?: {
      config?: {},
    },
  }
}

export interface PresetEmptyRoute<ROLE extends string = string> extends PresetRoute<ROLE> {
  preset: 'empty',
  layout?: 'main'| 'empty' | null,
  route?: {
    name: '',
    path: '',
    component?: RouteComponent | (() => Promise<RouteComponent>),
  }
}

export type RequiredPreset<T extends PresetRoute> = Required<T>;

export interface SimpleRoute<ROLE extends string = string> extends BaseRoute<ROLE> {
  preset?: never,
  route: Route,
  config: Record<string, any>,
}

export type CustomRoute<ROLE extends string = string> =
  | SimpleRoute<ROLE>
  | PresetLoginRoute<ROLE>
  | PresetTableRoute<ROLE>
  | PresetCardRoute<ROLE>
  | PresetErrorRoute<ROLE>;

export interface GroupRoute<ROLE extends string = string> {
  group: true,
  name: string,
  title: TranslateData,
  icon: IconImport,
  roles?: string[] | null,
  routes: CustomRoute<ROLE>[],
}

export type RouteOrGroup<ROLE extends string = string> =
  | CustomRoute<ROLE>
  | GroupRoute<ROLE>;

export interface RoutingConfig<ROLE extends string = string> {
  routes: RouteOrGroup<ROLE>[],
  global: GlobalRouting,
}
