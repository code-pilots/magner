import api from 'settings/utils/api';
import dataToProxy, { Response, Proxy } from 'app/proxies/user';
import type { RequestFunc } from 'settings/types/utils';

const usersRequest: RequestFunc<Proxy> = async ({ data }: { data: { page: number, items: number }}) => {
  try {
    const res: Response = await api.get(`patients?page=${data.page}&items=${data.items}`);
    const proxied = dataToProxy(res);

    return { error: null, data: proxied };
  } catch (e) {
    console.error(e);
    return { error: null, data: { users: [], pagination: null, total: 0 } };
  }
};

export default usersRequest;
