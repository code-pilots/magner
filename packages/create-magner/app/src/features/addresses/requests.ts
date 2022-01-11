import { request, requestCard, requestTable } from 'magner';
import type { ApiErrorData } from 'magner';
import { Address } from 'features/addresses/types';

export const fakeAddress: Address = {
  id: 'abc',
  name: 'Адрес 1',
  description: 'Офис',
  address: 'г. Москва, ул. Красноармейская, д. 4',
  point: '55.797397,37.549390',
};

interface TableResponse {
  list: Address[],
  pager: {
    current: number,
    max: number,
  },
}

export const addressRead = requestTable<Address>(async ({ api, urlParsers, data }) => {
  try {
    const res = await api.get<TableResponse>(`/api/admin/address/list${urlParsers.dataToUrl(data)}`);
    return {
      data: {
        rows: res.list,
        pagination: {
          currentPage: res.pager.current,
          totalPages: res.pager.max,
          totalItems: 0,
        },
      },
    };
  } catch (e) {
    return {
      data: {
        rows: [],
        pagination: null,
      },
    };
  }
});

export const addressGet = requestCard<Address, Address>(async ({ api, data, errorParser }) => {
  try {
    const res = await api.get<{ address: Address }>(`/api/admin/address?id=${data.id}`);
    return { data: res.address };
  } catch (e) {
    return { error: errorParser(e as ApiErrorData) };
  }
});

export const addressCreate = requestCard<Address, Address>(async ({ api, data, errorParser }) => {
  try {
    const res = await api.post<Address, { address: Address }>('/api/admin/address', data.data);
    return { data: res.address };
  } catch (e) {
    return { error: errorParser(e as ApiErrorData) };
  }
});

export const addressUpdate = requestCard<Address, Address>(async ({ api, data, errorParser }) => {
  try {
    const res = await api.patch<Address, { address: Address }>('/api/admin/address', data.data);
    return { data: res.address };
  } catch (e) {
    return { error: errorParser(e as ApiErrorData) };
  }
});

export const addressDelete = request(async () => ({ data: 'ok' }));
