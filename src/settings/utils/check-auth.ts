import { store } from 'settings/controllers/store';
import api from './api';

/**
 * Navigation guard that checks if you can enter a protected route.
 * Gets your authorization token, sends it to the backend (if not verified)
 * and lets you proceed further.
 */
const checkAuth = async (isRouteProtected: boolean) => {
  if (store?.state?.token === 'null') await store.dispatch('changeToken', null);

  if (isRouteProtected) {
    if (store?.state.user) {
      return true;
    }

    if (store?.state.token) {
      const user = await api.get('');
      if (user) {
        await store.dispatch('changeUser', user);
        return true;
      }
      await store.dispatch('changeToken', null);
    }

    return { name: 'home' };
  }

  // If route is not protected
  if (store?.state.user) {
    return { name: 'dashboard' };
  }

  if (store?.state.token) {
    const user = await api.get('');
    if (user) {
      await store.dispatch('changeUser', user);
      return { name: 'dashboard' };
    }
    await store.dispatch('changeToken', null);
  }

  return true;
};

export default checkAuth;
