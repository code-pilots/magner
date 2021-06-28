import dataToProxy, { Response, Proxy } from 'app/proxies/patients';
import request from 'core/utils/request';

interface ReqData {
  pagination: {
    items: number,
    page: number,
  },
  filters: {},
  sort: {},
}

const patientsRequest = request<Proxy, ReqData>(async ({ data, api, store }) => {
  try {
    const query = store.state.project.helpers.dataToUrl({
      ...data.pagination,
      filters: data.filters,
      sort: data.sort,
    });

    const res: Response = await api.get(`patients${query}`);
    const proxied = dataToProxy(res);

    return { error: null, data: proxied };
  } catch (e) {
    console.error(e);
    return { error: null, data: { users: [], pagination: null, total: 0 } };
  }
});

export default patientsRequest;
