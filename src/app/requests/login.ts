import dataToProxy, { Response } from 'app/proxies/login';
import request from 'core/utils/request';

const loginRequest = request<true>(async ({
  data, store, api,
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

  return { error: null, data: true };
});

export default loginRequest;
