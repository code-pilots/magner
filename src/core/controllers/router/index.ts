import { createRouter, createWebHistory, Router } from 'vue-router';
import type { RoutingConfig } from 'core/types/configs';
import globalValues from 'core/global';
import makeRoutes from './make-routes';

export type RouterController = Router;

export const routerController = (config: RoutingConfig): RouterController => {
  const routes = makeRoutes(config.routes);

  globalValues.store.dispatch('changeAllRoutes', config.routes);
  globalValues.store.dispatch('changeGlobalRoutes', config.global);

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  globalValues.router = router;

  return router;
};
