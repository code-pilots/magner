import { _RouteRecordBase, RouteLocationNormalized, RouteRecordRedirectOption } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

type _RouteRecordProps = boolean | Record<string, any> | ((to: RouteLocationNormalized) => Record<string, any>);
interface RouteRecordSingleViewOverride extends _RouteRecordBase {
  component: string;
  components?: never;
  props?: _RouteRecordProps;
}

interface RouteRecordMultipleViewsOverride extends _RouteRecordBase {
  component: string;
  components?: never;
  props?: boolean | Record<string, any> | ((to: RouteLocationNormalized) => Record<string, any>);
}

interface RouteRecordRedirectOverride extends _RouteRecordBase {
  redirect: RouteRecordRedirectOption;
  component?: never;
  components?: never;
}

export type CustomRoute = RouteRecordSingleViewOverride | RouteRecordMultipleViewsOverride | RouteRecordRedirectOverride;

export interface RoutingConfig {
  routes: CustomRoute[]
}
