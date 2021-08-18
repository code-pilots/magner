import { createRouter, createWebHistory, Router } from 'vue-router';
import type { RoutingConfig } from 'core/types/configs';
import makeRoutes from './make-routes';

export interface RoutingFinalConfig {
  router: Router,
  routing: RoutingConfig,
}
export type RouterController = () => RoutingFinalConfig;

export const routerController = <ROLE extends string>(config: RoutingConfig): RouterController => () => {
  const routes = makeRoutes(config.routes);

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  return {
    router,
    routing: config,
  };
};
