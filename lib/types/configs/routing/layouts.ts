import type { RouteComponent } from 'vue-router';
import type { IconImport } from 'lib/types/utils/useful';
import type { TranslateData } from 'lib/utils/core/translate';

export type SupportedLayouts = 'main' | 'empty';

export interface RouteLayoutBase {
  layout: SupportedLayouts | RouteComponent | (() => Promise<RouteComponent>),
}

export interface RouteEmptyLayout extends RouteLayoutBase {
  layout: 'empty',
}

export interface RouteMainLayout extends RouteLayoutBase {
  layout: 'main',

  /** Display title in the sidebar and a page */
  title?: TranslateData,

  /** Whether to display in the sidebar or not */
  visible?: boolean,

  /** Sidebar icon */
  icon?: IconImport,
}

export interface RouteCustomLayout extends RouteLayoutBase {
  layout: RouteComponent | (() => Promise<RouteComponent>),
  [key: string | number]: unknown,
}

export type RouteLayout =
  | RouteCustomLayout
  | RouteEmptyLayout
  | RouteMainLayout;
