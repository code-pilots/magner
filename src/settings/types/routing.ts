import {
  _RouteRecordBase,
  RouteComponent,
  RouteLocationNormalized,
  RouteRecordRedirectOption,
} from 'vue-router';
import { LoginConfig } from 'settings/types/login';

/**
 * Redefine Vue Router types to accept 'component' as a string
 * and extend their 'meta' field. Will be used by controllers mostly
 */

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[] | null,
  }
}

type _RouteRecordProps = boolean | Record<string, any> | ((to: RouteLocationNormalized) => Record<string, any>);
interface RouteRecordSingleViewOverride extends _RouteRecordBase {
  component: string | RouteComponent | (() => Promise<RouteComponent>);
  components?: never;
  props?: _RouteRecordProps;
}

interface RouteRecordRedirectOverride extends _RouteRecordBase {
  redirect: RouteRecordRedirectOption;
  component?: never;
  components?: never;
}

export type Route = RouteRecordSingleViewOverride | RouteRecordRedirectOverride;

export type ConfigProps<T> = { config: T };

/**
 * Define custom routes to be used in configuration
 */
export interface BaseRoute {
  layout?: string|null,
  config?: string,
  roles: string[] | null, // TODO: roles (maybe generic)
}

export type SupportedRoutePresets = 'login'|'empty';

export interface PresetRoute extends BaseRoute {
  preset: SupportedRoutePresets,
  route?: Route,
}

export interface PresetLoginRoute extends PresetRoute {
  preset: 'login',
  config?: 'login',
  layout?: null,
  route?: {
    name: 'login',
    path: '/login',
    component: 'login',
    props: ConfigProps<LoginConfig>,
  },
}

export interface PresetEmptyRoute extends PresetRoute {
  preset: 'empty',
  config?: '',
  layout?: null,
  route?: {
    name: '',
    path: '',
    component: '',
  }
}

export interface SimpleRoute extends BaseRoute {
  preset?: never,
  route: Route,
  config: string,
}

export type CustomRoute = PresetLoginRoute | SimpleRoute;

export interface RoutingConfig {
  routes: CustomRoute[]
}
