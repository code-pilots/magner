import {
  createRouter,
  createWebHistory,
  RouteComponent,
  RouteRecordRaw,
} from 'vue-router';
import type { PresetRoute, SimpleRoute } from 'settings/types';
import { mergeDeep } from 'settings/utils/merge-deep';
import routingConfig from 'configs/routing';
import allPresets from './presets';

const simpleToPreset = (route: SimpleRoute): PresetRoute => ({
  ...route,
  preset: 'empty',
});

const routes: RouteRecordRaw[] = routingConfig.routes.map((route) => {
  const presettedRoute: PresetRoute = route.preset ? route : simpleToPreset(route);

  const fullPreset: Required<PresetRoute> = mergeDeep(allPresets[presettedRoute.preset], route);

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
