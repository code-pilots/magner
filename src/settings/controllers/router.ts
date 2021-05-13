import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import routingConfig from 'configs/routing';

const routes: RouteRecordRaw[] = routingConfig.routes.map((route) => {
  const newRoute = { ...route } as RouteRecordRaw;
  if (route.component) {
    newRoute.component = () => import(`../views/${route.component}`);
  }

  return newRoute;
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
