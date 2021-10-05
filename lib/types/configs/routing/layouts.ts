import type { RouteComponent } from 'vue-router';
import type { IconImport } from 'lib/types/utils/useful';
import type { TranslateData } from 'lib/utils/core/translate';
import type { RouteBase, Route, NoLayoutRoute } from 'lib/types/configs/routing/routing';

export type SupportedLayouts = 'main' | 'empty';

interface LayoutProps {}
export interface LayoutBase {
  layout: SupportedLayouts | RouteComponent | (() => Promise<RouteComponent>),
  name: string,
  path: string,
  props: LayoutProps,
  routes: NoLayoutRoute[],
}

export interface EmptyLayoutRoute extends Route {}
export interface EmptyLayout extends LayoutBase {
  layout: 'empty',
  routes: NoLayoutRoute<EmptyLayoutRoute>[],
  props: {},
}

export interface MainLayoutRoute extends Route {
  /** Display title in the sidebar and a page */
  title?: TranslateData,

  /** Whether to display in the sidebar or not */
  visible?: boolean,

  /** Sidebar icon */
  icon?: IconImport,
}

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
  routes: NoLayoutRoute<MainLayoutRoute>[],
  props: MainLayoutProps,
}

export interface CustomLayoutRoute extends Route {
  [key: string | number]: unknown,
}

export interface CustomLayoutProps extends LayoutProps {
  [key: string | number]: unknown,
}

export interface CustomLayout extends LayoutBase {
  layout: RouteComponent | (() => Promise<RouteComponent>),
  routes: NoLayoutRoute<CustomLayoutRoute>[],
  props: CustomLayoutProps,
}

export type Layout =
  | CustomLayout
  | EmptyLayout
  | MainLayout;

export interface RouteLayout extends RouteBase {
  type: 'layout',
  /**
   * Layout of the page. Supports several types:
   * * empty – blank page
   * * main – header, sidebar included
   * * custom – you pass your own layout as a component with <router-view> inside of it
   *
   * Other keys of the 'layout' object are used inside those layouts
   */
  layout: Layout,
}
