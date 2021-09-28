import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import type {
  GroupRoute, PresetRoute, RouteOrGroup, RoutingConfig, SimpleRoute,
} from '../../types/configs';
import allPresets from './presets';
import checkAuth from '../../utils/core/check-auth';

const simpleToPreset = (route: SimpleRoute): PresetRoute => ({
  ...route,
  preset: 'empty',
});

const isGroup = (route: RouteOrGroup): route is GroupRoute => !!route.group;

/**
 * The function receives routes configuration, parses them
 * and outputs the format that is acceptable by vue router.
 */
const makeRoutes = (routes: RoutingConfig['routes']): RouteRecordRaw[] => {
  const allRoutes = routes.map((route) => {
    if (isGroup(route)) {
      return makeRoutes(route.routes);
    }

    const presettedRoute: PresetRoute = route.preset ? route : simpleToPreset(route);

    const fullPreset = {
      ...allPresets[presettedRoute.preset],
      ...route,
      route: {
        ...allPresets[presettedRoute.preset].route,
        ...route.route,
        props: {
          ...allPresets[presettedRoute.preset].route?.props,
          ...route.route?.props,
        },
      },
    } as Required<PresetRoute>;

    /** Transform component string to a real dynamically imported page view */
    let component: RouteComponent | (() => Promise<RouteComponent>);
    if (fullPreset.route.component) {
      component = fullPreset.route.component;
    } else {
      throw new Error(`Component for the route with path "${fullPreset.route.path}" is not defined.`);
    }

    fullPreset.route.meta = {
      roles: fullPreset.roles,
    };

    if (fullPreset.config && fullPreset.route.props) {
      fullPreset.route.props.config = fullPreset.config;
    }

    fullPreset.route.beforeEnter = checkAuth.bind(null, fullPreset.roles);

    const finalRoute = {
      ...fullPreset.route,
      component,
    } as RouteRecordRaw;

    /** Transform layout into a nested route */
    if (fullPreset.layout) {
      const layout = fullPreset.layout === 'main'
        ? () => import('../../views/layouts/main.vue')
        : () => import('../../views/layouts/empty.vue');

      return {
        path: '/',
        component: layout,
        children: [finalRoute],
      };
    }

    return finalRoute;
  }).flat();

  return allRoutes;
};

export default makeRoutes;
