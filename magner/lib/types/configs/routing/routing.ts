import type { RouteComponent, _RouteRecordBase } from 'vue-router';
import type { RoutePreset } from './routing-presets';
import type { RouteLayout } from './layouts';

export type RouteTypes = 'custom' | 'preset' | 'layout';

/** Restricts access to the route. Possible cases:
 * `false` or `undefined` – no auth checking is performed before entering the route.
 * `true` – allows entering the route to authenticated users
 * `string[]` – allows access to the authenticated users with roles listed in the array
 */
export type RouteAccessRestriction = string[] | boolean;

export interface GlobalRouting {
  /** Optional base to provide. Gives an url of `https://example.com/BASE/ */
  base?: string,
  /** Name of the route to which should we redirect unauthenticated user from protected route */
  homeNoAuthName: string,
  /** Name of the route to which should we redirect authenticated user from unprotected route */
  homeHasAuthName: string,
}

export interface Route extends _RouteRecordBase {
  /** Route path. Refer to the Vue Router docs */
  path: string,

  /** Route unique name. Refer to the Vue Router docs */
  name: string,

  props?: Record<string, unknown>,

  /** Who can access the route */
  roles?: RouteAccessRestriction,

  /** Load Vue component to display as a page */
  component?: RouteComponent | (() => Promise<RouteComponent>),
}

export interface RouteBase {
  type: RouteTypes,
}

export interface RouteCustom<ROUTE extends Route = Route> extends RouteBase {
  type: 'custom',
  route: ROUTE,
}

/** Magner route, a wrapper around the Vue route */
export type FinalRoute<ROUTE extends Route = Route> =
  | RouteCustom<ROUTE>
  | RoutePreset<ROUTE>
  | RouteLayout;

export type FinalNoLayoutRoute<ROUTE extends Route = Route> = | RouteCustom<ROUTE> | RoutePreset<ROUTE>;

/** Magner routing configuration */
export interface RoutingConfig {
  /** Array of Magner routes. It could be one of 3 types:
   * * 'custom' – custom route with your own Vue template
   * * 'preset' – route with configuration, defining the page. Could be 'login', 'table', 'card' etc.
   * * 'group – an array of routes. Influences only the sidebar menu creating nested levels of navigation
   */
  routes: FinalRoute[],

  /** Global routing configuration that defines special needs in routing like programmatic navigation */
  global: GlobalRouting,
}
