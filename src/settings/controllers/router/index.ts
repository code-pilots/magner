import {
  createRouter,
  createWebHistory,
  RouteComponent,
  RouteRecordRaw,
} from 'vue-router';
import type { PresetRoute, SimpleRoute } from 'settings/types/configs';
import { mergeDeep } from 'settings/utils/merge-deep';
import routingConfig from 'configs/routing';
import checkAuth from 'settings/utils/check-auth';
import allPresets from './presets';

const simpleToPreset = (route: SimpleRoute): PresetRoute => ({
  ...route,
  preset: 'empty',
});

const routes: RouteRecordRaw[] = routingConfig.routes.map((route) => {
  const presettedRoute: PresetRoute = route.preset ? route : simpleToPreset(route);

  const fullPreset: Required<PresetRoute> = mergeDeep(allPresets[presettedRoute.preset], route);

  /** Transform component string to a real dynamically imported page view */
  let component: RouteComponent | (() => Promise<RouteComponent>);
  if (fullPreset.route.component) {
    if (typeof fullPreset.route.component === 'string') {
      const concat = `../../views/pages/${fullPreset.route.component}.vue`;
      component = () => import(/* @vite-ignore */ concat);
    } else {
      component = fullPreset.route.component;
    }
  } else {
    throw new Error(`Component for the route with path "${fullPreset.route.path}" is not defined.`);
  }

  fullPreset.route.meta = {
    roles: fullPreset.roles,
  };

  fullPreset.route.beforeEnter = checkAuth.bind(null, !!fullPreset.roles);

  return {
    ...fullPreset.route,
    component,
  } as RouteRecordRaw;
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
