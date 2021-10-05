import type { RouteComponent } from 'vue-router';
import type { IconImport } from 'lib/types/utils/useful';
import type { TranslateData } from 'lib/utils/core/translate';
import type { RouteBase, Route, FinalNoLayoutRoute } from 'lib/types/configs/routing/routing';

export type SupportedLayouts = 'main' | 'empty';

interface LayoutProps {}

/** Default properties applicable to most of layouts */
export interface LayoutBase {
  layout: SupportedLayouts | RouteComponent | (() => Promise<RouteComponent>),
  name: string,
  path: string,
  props: LayoutProps,
  routes: FinalNoLayoutRoute[],
}

/** Route configuration used in the Empty layout  */
export interface EmptyLayoutRoute extends Route {}

/** Layout with no wrapping around routes. Hence, empty */
export interface EmptyLayout extends LayoutBase {
  layout: 'empty',
  routes: FinalNoLayoutRoute<EmptyLayoutRoute>[],
  props: {},
}

/** Route configuration used in the Main layout  */
export interface MainLayoutRoute extends Route {
  /** Display title in the sidebar and a page */
  title?: TranslateData,

  /** Whether to display in the sidebar or not */
  visible?: boolean,

  /** Sidebar icon */
  icon?: IconImport,
}

/** Group property of the main layout props. Lists the route names to visually group them in the sidebar */
export interface MainLayoutGroup<ROUTE = string> {
  /** Unique name of the group */
  name: string,

  /** The names of routes to group together */
  routes: ROUTE[],

  /** Display group title in the sidebar */
  title: TranslateData,

  /** Sidebar icon of the group */
  icon?: IconImport,
}

export interface MainLayoutProps extends LayoutProps {
  sidebarGroups?: MainLayoutGroup[],
}

/** Main layout has a header and a sidebar with nested routes */
export interface MainLayout extends LayoutBase {
  layout: 'main',
  routes: FinalNoLayoutRoute<MainLayoutRoute>[],
  props: MainLayoutProps,
}

/**
 * Route configuration used in the Custom layout.
 * It is made for you to extend in any way possible with new properties
 */
export interface CustomLayoutRoute extends Route {
  [key: string | number]: unknown,
}

export interface CustomLayoutProps extends LayoutProps {
  [key: string | number]: unknown,
}

/**
 * Custom layout accepts your component as 'layout'.<br>
 * Read the guide in docs on how to extend it and use in your app
 */
export interface CustomLayout extends LayoutBase {
  layout: RouteComponent | (() => Promise<RouteComponent>),
  routes: FinalNoLayoutRoute<CustomLayoutRoute>[],
  props: CustomLayoutProps,
}

/** Layout is a wrapper component over your routes. Can be custom, main or empty */
export type Layout =
  | CustomLayout
  | EmptyLayout
  | MainLayout;

export interface RouteLayout extends RouteBase {
  /**
   * Layout of the page. Supports several types:
   * * empty – blank page
   * * main – header, sidebar included
   * * custom – you pass your own layout as a component with <router-view> inside of it
   *
   * Other keys of the 'layout' object are used inside those layouts
   */
  type: 'layout',
  layout: Layout,
}
