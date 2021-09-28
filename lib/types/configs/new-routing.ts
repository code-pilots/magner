import type { IconImport } from 'lib/types/utils/useful';
import type { TranslateData } from 'lib/utils/core/translate';
import type { RouteComponent } from 'vue-router';
import type { PresetRoute } from './routing-presets';

export type SupportedLayouts = 'main' | 'empty';
export type RouteViews = 'custom' | 'preset' | 'group';

export type RouteAccessRestriction = string[] | boolean;

export interface Route {
  title: TranslateData,
  path: string,
  name: string,

  roles?: RouteAccessRestriction,
  icon?: IconImport,
  visible?: boolean,

  layout?: SupportedLayouts | RouteComponent | (() => Promise<RouteComponent>),
  component?: RouteComponent | (() => Promise<RouteComponent>),
}

export interface RouteBase {
  view: RouteViews,
}

export interface CustomRoute extends RouteBase {
  view: 'custom',
  route: Route,
}

export interface RouteGroup extends RouteBase {
  view: 'group',
  name: string,
  title: TranslateData,
  routes: Route[],
  icon?: IconImport,
  roles?: RouteAccessRestriction,
}

export type FinalRoute =
  | CustomRoute
  | PresetRoute
  | RouteGroup;

export interface Routing {
  routes: FinalRoute[],
}
