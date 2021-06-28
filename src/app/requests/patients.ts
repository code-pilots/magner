import request from 'core/utils/request';
import { PaginationType, TableRequest } from 'core/types/configs';
import { ProxyFunc } from 'core/types/utils';

interface Patient {
  id: number,
  fullName: string,
  receptionDate: string,
  birthDate: string,
  gender: 'male'|'female',
  email: string,
  address: string,
  apartment: string,
  lat: number,
  long: number,
}

interface Response {
  result: {
    table: {
      rows: Patient[],
      totalItems: number,
      pagination: PaginationType | null,
      sortFields: string[],
    },
  },
}

interface Proxy {
  rows: Patient[],
  pagination: PaginationType | null,
}

const dataToProxy: ProxyFunc<Response, Proxy> = (data) => ({
  rows: data.result.table.rows,
  pagination: data.result.table.pagination,
});

const patientsRequest: TableRequest<Patient> = request(async ({ data, api, store }) => {
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
    return { error: null, data: { rows: [], pagination: null, total: 0 } };
  }
});

export default patientsRequest;
