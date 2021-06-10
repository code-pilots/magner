import { createRouter, createWebHistory, Router } from 'vue-router';
import type { RoutingConfig } from 'core/types/configs';
import { store } from 'core/controllers/store/store';
import makeRoutes from './make-routes';

export type RouterController = Router;

export const routerController = (config: RoutingConfig): RouterController => {
  const routes = makeRoutes(config);

  store.dispatch('changeAllRoutes', config.routes);
  store.dispatch('changeGlobalRoutes', config.global);

  return createRouter({
    history: createWebHistory(),
    routes,
  });
};
