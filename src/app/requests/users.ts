import api from 'settings/utils/api';
import dataToProxy, { Response, Proxy } from 'app/proxies/user';
import type { RequestFunc } from 'settings/types/utils';

const usersRequest: RequestFunc<Proxy> = async () => {
  try {
    const res: Response = await api.get('patients?page=1&items=100');
    const proxied = dataToProxy(res);

    return { error: null, data: proxied };
  } catch (e) {
    return { error: 'Error', data: null };
  }
};

export default usersRequest;
