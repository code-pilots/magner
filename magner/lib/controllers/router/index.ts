import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';
import type { RoutingConfig } from 'lib/types/configs/routing';
import makeRoutes from './make-routes';

export interface RoutingFinalConfig {
  router: Router,
  routing: RoutingConfig,
}
export type RouterController = () => RoutingFinalConfig;

export const routerController = <ROLE extends string>(config: RoutingConfig): RouterController => () => {
  const routes = makeRoutes(config.routes);

  const router = createRouter({
    history: createWebHistory(config.global?.base),
    routes: routes as RouteRecordRaw[],
  });

  return {
    router,
    routing: config,
  };
};
