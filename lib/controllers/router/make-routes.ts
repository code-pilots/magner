import type { RouteRecordRaw } from 'vue-router';
import type { FinalRoute, Route } from 'lib/types/configs/routing';
import allPresets from './presets';
import checkAuth from '../../utils/core/check-auth';

/**
 * The function receives routes configuration, parses them
 * and outputs the format that is acceptable by vue router.
 */
const makeRoutes = (routes: FinalRoute[]): Route[] => routes.map((route) => {
  /** Use recursion to parse the group routes */
  if (route.type === 'group') {
    return makeRoutes(route.routes);
  }

  /** Create a 'finalRoute' object with default values for preset-ed routes */
  let finalRoute: Route;
  if (route.type === 'preset') {
    if (!route.preset?.preset) {
      throw new Error(`No preset type provided for the route with path "${route.route?.path || ''}"`);
    }
    if (!allPresets[route.preset.preset]) {
      throw new Error(`Unsupported preset: ${route.preset.preset || ''}`);
    }

    finalRoute = {
      ...allPresets[route.preset.preset],
      ...route.route,
      props: {
        ...(route.route.props || {}),
        config: route.preset.config || {},
      },
    };
  } else {
    finalRoute = { ...route.route };
  }

  /** Check that a route has a component to render */
  if (!finalRoute.component) {
    throw new Error(`Component for the route with path "${finalRoute.path}" is not defined.`);
  }

  /** Implement authorization and role management with 'checkAuth' function */
  finalRoute.meta = { roles: finalRoute.roles };
  finalRoute.beforeEnter = checkAuth.bind(null, finalRoute.roles);

  /** Transform layout into a nested route */
  if (finalRoute.layout) {
    // TODO: add custom or dynamic layout
    const layout = finalRoute.layout === 'main'
      ? () => import('../../views/layouts/main.vue')
      : () => import('../../views/layouts/empty.vue');

    return {
      path: '/',
      name: '',
      component: layout,
      children: [finalRoute] as RouteRecordRaw[],
    };
  }

  return finalRoute;
}).flat();

export default makeRoutes;
