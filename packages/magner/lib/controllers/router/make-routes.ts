import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import type { FinalRoute, Route } from 'lib/types/configs/routing/routing';
import checkAuth from 'lib/utils/core/check-auth';
import allPresets from './presets';

/**
 * The function receives routes configuration, parses them
 * and outputs the format that is acceptable by vue router.
 */
const makeRoutes = (routes: FinalRoute[]): Route[] => routes.map((route) => {
  /** Use recursion to parse the nested routes of layout */
  if (route.type === 'layout') {
    const nestedRoutes = makeRoutes(route.layout.routes);

    /** Transform layout into a nested route */
    let layout: RouteComponent | (() => RouteComponent);
    if (route.layout) {
      if (typeof route.layout.layout === 'string') {
        layout = () => import('../../views/layouts/main.vue');
      } else {
        layout = route.layout.layout;
      }
    } else {
      layout = () => import('../../views/layouts/empty.vue');
    }

    return {
      path: route.layout.path,
      name: route.layout.name,
      component: layout,
      props: {
        routes: nestedRoutes,
        data: route.layout.props,
      },
      children: nestedRoutes as RouteRecordRaw[],
    };
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

  return finalRoute;
}).flat();

export default makeRoutes;
