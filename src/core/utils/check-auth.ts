import type { PresetRoute } from 'core/types/configs';
import profileRequest from 'app/requests/profile';
import globalValues from 'core/global';

/**
 * Navigation guard that checks if you can enter a protected route.
 * Gets your authorization token, sends it to the backend (if not verified)
 * and lets you proceed further.
 */
const checkAuth = async (route: Required<PresetRoute>) => {
  const store = globalValues.store;
  if (globalValues.development.noBackendMode) {
    return true;
  }

  if (store.state.token === 'null') await store.dispatch('changeToken', null);

  const roles = route.route.meta?.roles;
  const globalRoutes = globalValues.routes.global;

  if (roles) {
    if (store.state.user) {
      return store.state.role && roles.includes(store.state.role);
    }

    if (store.state.token) {
      const user = await profileRequest();
      const role = user.data?.role;

      if (user.data) {
        await store.dispatch('changeUser', user.data);
        await store.dispatch('changeRole', user.data.role);

        if (role && roles.includes(role)) return true;
        return { name: globalRoutes.homeHasAuthName };
      }
      await store.dispatch('changeToken', null);
    }

    return { name: globalRoutes.homeNoAuthName };
  }

  // If route is not protected
  if (store.state.user) {
    return { name: globalRoutes.homeHasAuthName };
  }

  if (store.state.token) {
    const user = await profileRequest();
    if (user.data) {
      await store.dispatch('changeUser', user.data);
      return { name: globalRoutes.homeHasAuthName };
    }
    await store.dispatch('changeToken', null);
  }

  return true;
};

export default checkAuth;
