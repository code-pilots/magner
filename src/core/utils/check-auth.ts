import profileRequest from 'app/requests/profile';
import { store } from '../controllers/store/store';

/**
 * Navigation guard that checks if you can enter a protected route.
 * Gets your authorization token, sends it to the backend (if not verified)
 * and lets you proceed further.
 */
const checkAuth = async (isRouteProtected: boolean) => {
  if (store?.state?.token === 'null') await store.dispatch('changeToken', null);

  const globalRoutes = store.state.globalRoutes;

  if (isRouteProtected) {
    if (store?.state.user) {
      return true;
    }

    if (store?.state.token) {
      const user = await profileRequest();
      if (user.data) {
        await store.dispatch('changeUser', user.data);
        return true;
      }
      await store.dispatch('changeToken', null);
    }

    return { name: globalRoutes.homeNoAuthName };
  }

  // If route is not protected
  if (store?.state.user) {
    return { name: globalRoutes.homeHasAuthName };
  }

  if (store?.state.token) {
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
