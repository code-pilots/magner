import type { ProxyFunc } from '../../core/types/utils';

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

interface Pagination {
  currentPage: number,
  totalItems: number,
  totalPages: number,
}

export interface Response {
  result: {
    table: {
      rows: Patient[],
      totalItems: number,
      pagination: Pagination | null,
      sortFields: string[],
    },
  },
}

export interface Proxy {
  users: Patient[],
  total: number,
  pagination: Pagination | null,
}

const dataToProxy: ProxyFunc<Response, Proxy> = (data) => ({
  users: data.result.table.rows,
  total: data.result.table.totalItems,
  pagination: data.result.table.pagination,
});

export default dataToProxy;
