import { Address } from 'features/addresses/types';
import { request } from '~/utils/request';

interface TableResponse {
  list: Address[],
  pager: {
    current: number,
    max: number,
  },
}

export const addressRead = request.table<Address>(async ({ api, dataToUrl, data }) => {
  const res = await api.get<TableResponse>(`/api/admin/address/list${dataToUrl?.(data)}`);

  if (res.error) {
    return {
      data: {
        rows: [],
        pagination: null,
      },
    };
  }

  return {
    data: {
      rows: res.data.list,
      pagination: {
        currentPage: res.data.pager.current,
        totalPages: res.data.pager.max,
        totalItems: 0,
      },
    },
  };
});

export const addressGet = request.card<Address, Address>(async ({ api, data, parseError }) => {
  const res = await api.get<{ address: Address }>(`/api/admin/address?id=${data.id}`);
  if (res.error) {
    return { error: parseError(res.error) };
  }
  return { data: res.data.address };
});

export const addressCreate = request.card<any, Address>(async ({ api, data, parseError }) => {
  const res = await api.post<{ address: Address }>('/api/admin/address', data.data);
  if (res.error) {
    return { error: parseError?.(res.error) };
  }
  return { data: res.data.address };
});

export const addressUpdate = request.card<Address, Address>(async ({ api, data, parseError }) => {
  const res = await api.post<{ address: Address }>('/api/admin/address', data.data);
  if (res.error) {
    return { error: parseError(res.error) };
  }
  return { data: res.data.address };
});

export const addressDelete = request.custom(async () => ({ data: 'ok' }));
