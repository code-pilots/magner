import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('./pages/home.vue'),
  },
  {
    name: 'error',
    path: '/:pathMatch(.*)*',
    component: () => import('./pages/error.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
