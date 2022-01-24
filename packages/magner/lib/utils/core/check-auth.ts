import type { RouteAccessRestriction } from 'lib/types/configs/routing/routing';
import globalValues from 'lib/global';

/**
 * Navigation guard that checks if you can enter a protected route.
 * Gets your authorization token, sends it to the backend (if not verified)
 * and lets you proceed further.
 */
const checkAuth = async (roles?: RouteAccessRestriction) => {
  const store = globalValues.store;
  if (globalValues.development.noBackendMode) {
    return true;
  }

  const globalRoutes = globalValues.routes.global;
  const profileRequest = globalValues.development.profileRequest;

  if (roles) {
    if (store.state.user) {
      return !!(store.state.role && (roles === true || roles.includes(store.state.role)));
    }

    const user = await profileRequest(null);
    const role = user.data?.role;

    if (user.error) {
      return { name: globalRoutes.homeNoAuthName };
    }

    await store.dispatch('changeUser', user.data?.user);
    await store.dispatch('changeRole', user.data.role);

    if (role && (roles === true || roles.includes(role))) return true;
    return { name: globalRoutes.homeHasAuthName };
  }

  // If route is not protected
  if (store.state.user) {
    return { name: globalRoutes.homeHasAuthName };
  }

  const user = await profileRequest(null);
  if (user.error) {
    return true;
  }

  await store.dispatch('changeRole', user.data?.role);
  await store.dispatch('changeUser', user.data?.user);

  return { name: globalRoutes.homeHasAuthName };
};

export default checkAuth;
