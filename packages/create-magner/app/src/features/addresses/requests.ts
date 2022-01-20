import { request } from '~/utils/request';
import { Address } from './types';

interface TableResponse {
  list: Address[],
  pagination: {
    current: number,
    max: number,
    total: number,
  },
}

export const addressRead = request.table<Address>(async ({ api, dataToUrl, data }) => {
  const res = await api.get<TableResponse>('/addresses');

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
        currentPage: res.data?.pagination.current,
        totalPages: res.data?.pagination.max,
        totalItems: res.data?.pagination.total,
      },
    },
  };
});

export const addressGet = request.card<Address, Address>(async ({ api, data, parseError }) => {
  const res = await api.get<{ address: Address }>(`/addresses/${data.id}`);
  if (res.error) {
    return { error: parseError(res.error) };
  }
  return { data: res.data.address };
});

export const addressCreate = request.card<any, Address>(async ({ api, data, parseError }) => {
  const res = await api.post<{ address: Address }>('/addresses', data.data);
  if (res.error) {
    return { error: parseError?.(res.error) };
  }
  return { data: res.data.address };
});

export const addressUpdate = request.card<Address, Address>(async ({ api, data, parseError }) => {
  const res = await api.post<{ address: Address }>(`/addresses/${data.id}`, data.data);
  if (res.error) {
    return { error: parseError(res.error) };
  }
  return { data: res.data.address };
});

export const addressDelete = request.card<{ data: 'ok' }, Address>(async ({ api, data, parseError }) => {
  const res = await api.delete(`/addresses/${data.id}`);
  if (res.error) {
    return { error: parseError(res.error) };
  }
  return { data: res.data };
});
