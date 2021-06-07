import dataToProxy, { Response, Proxy } from 'app/proxies/patients';
import dataToUrl from 'app/proxies/get-request';
import api from '../../core/utils/api';
import type { RequestFunc } from '../../core/types/utils';

const patientsRequest: RequestFunc<Proxy> = async ({ data }: { data: { page: number, items: number }}) => {
  try {
    const res: Response = await api.get(`patients${dataToUrl(data)}`);
    const proxied = dataToProxy(res);

    return { error: null, data: proxied };
  } catch (e) {
    console.error(e);
    return { error: null, data: { users: [], pagination: null, total: 0 } };
  }
};

export default patientsRequest;
