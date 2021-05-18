import api from 'settings/utils/api';
import dataToProxy, { Response } from 'app/proxies/login';
import type { RequestFunc } from 'settings/types/utils';

const loginRequest: RequestFunc = async ({ data, store }) => {
  const res: Response = await api.post('auth/login', data);
  const proxied = dataToProxy(res);

  await store.dispatch('changeToken', proxied.token);
  await store.dispatch('changeUser', proxied.user);
  await store.dispatch('changeRole', proxied.role);

  return null;
};

export default loginRequest;
