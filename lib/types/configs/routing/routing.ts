import type { RouteComponent, _RouteRecordBase } from 'vue-router';
import type { IconImport } from 'lib/types/utils/useful';
import type { TranslateData } from 'lib/utils/core/translate';
import type { RoutePreset } from './routing-presets';

export type SupportedLayouts = 'main' | 'empty';
export type RouteTypes = 'custom' | 'preset' | 'group';

/** Restricts access to the route. Possible cases:
 * `false` or `undefined` – no auth checking is performed before entering the route.
 * `true` – allows entering the route to authenticated users
 * `string[]` – allows access to the authenticated users with roles listed in the array
 */
export type RouteAccessRestriction = string[] | boolean;

export interface GlobalRouting {
  /** Name of the route to which should we redirect unauthenticated user from protected route */
  homeNoAuthName: string,
  /** Name of the route to which should we redirect authenticated user from unprotected route */
  homeHasAuthName: string,
}

export interface Route extends _RouteRecordBase {
  path: string,
  name: string,

  props?: Record<string, unknown>,

  /** Display title in the sidebar and a page */
  title?: TranslateData,

  /** Who can access the route */
  roles?: RouteAccessRestriction,

  /** Sidebar icon */
  icon?: IconImport,

  /** Whether to display in the sidebar or not */
  visible?: boolean,

  /**
   * Layout of the page. Supports several types:
   * * empty – blank page
   * * main – header, sidebar included
   */
  // TODO: change 'layout' to the object with Layout configuration (just like presets)
  layout?: SupportedLayouts | RouteComponent | (() => Promise<RouteComponent>),

  /** Load Vue component to display as a page */
  component?: RouteComponent | (() => Promise<RouteComponent>),
}

export interface RouteBase {
  type: RouteTypes,
}

export interface RouteCustom extends RouteBase {
  type: 'custom',
  route: Route,
}

export interface RouteGroup extends RouteBase {
  type: 'group',
  name: string,
  title: TranslateData,
  routes: FinalRoute[], // eslint-disable-line no-use-before-define
  icon?: IconImport,
  roles?: RouteAccessRestriction,
}

/** Magner route, a wrapper around the Vue route */
export type FinalRoute =
  | RouteCustom
  | RoutePreset
  | RouteGroup;

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
