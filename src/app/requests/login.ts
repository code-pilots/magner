import dataToProxy, { Response } from 'app/proxies/login';
import api from '../../core/utils/api';
import type { RequestFunc } from '../../core/types/utils';

const loginRequest: RequestFunc<true> = async ({
  data, store, router, globalRoutes,
}) => {
  try {
    const res: Response = await api.post('auth/login', data);
    const proxied = dataToProxy(res);

    await store.dispatch('changeToken', proxied.token);
    await store.dispatch('changeUser', proxied.user);
    await store.dispatch('changeRole', proxied.role);
  } catch (e) {
    return { error: 'Error', data: null };
  }

  if (router && globalRoutes) {
    await router.push({ name: globalRoutes.homeHasAuthName });
  }

  return { error: null, data: true };
};

export default loginRequest;
