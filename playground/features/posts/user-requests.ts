import { tableRequest } from 'lib/index';
import { paginationProxy } from './requests';

export interface User {
  id: string,
  title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | '',
  firstName: string,
  lastName: string,
  picture: string,
}

interface Response {
  data: User[],
  total: number,
  page: number,
  limit: number,
}

export const readUsers = tableRequest(async ({ data, api, urlParsers }) => {
  try {
    const query = urlParsers.dataToUrl({
      limit: data.pagination?.items || 10,
      page: data.pagination?.page || 1,
      filters: data.filters,
      sort: data.sort,
    });

    const res: Response = await api.get<Response>(`/user${query}`);

    return {
      data: {
        rows: res.data,
        pagination: paginationProxy(res),
      },
    };
  } catch (e) {
    console.error(e);
    return { data: { rows: [], pagination: null } };
  }
});
