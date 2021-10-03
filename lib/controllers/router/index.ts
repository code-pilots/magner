import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';
import type { Routing } from 'lib/types/configs/routing';
import makeRoutes from './make-routes';

export interface RoutingFinalConfig {
  router: Router,
  routing: Routing,
}
export type RouterController = () => RoutingFinalConfig;

export const routerController = <ROLE extends string>(config: Routing): RouterController => () => {
  const routes = makeRoutes(config.routes);

  const router = createRouter({
    history: createWebHistory(),
    routes: routes as RouteRecordRaw[],
  });

  return {
    router,
    routing: config,
  };
};
