import { request } from 'core/utils';
import { PaginationType, TableRequest } from 'core/types/configs';

interface SpecializationType {
  id: number,
  title: string,
  type: string,
}

interface Response {
  result: {
    table: {
      rows: SpecializationType[],
      totalItems: number,
      pagination: PaginationType | null,
      sortFields: string[],
    },
  },
}

const specializationsRequest: TableRequest<SpecializationType> = request(async ({ data, api, urlParsers }) => {
  try {
    const query = urlParsers.dataToUrl({
      ...data.pagination,
      filters: data.filters,
      sort: data.sort,
    });

    const res: Response = await api.get(`specializations${query}`);
    const proxied = {
      rows: res.result.table.rows,
      pagination: res.result.table.pagination,
    };

    return { error: null, data: proxied };
  } catch (e) {
    console.error(e);
    return { error: null, data: { rows: [], pagination: null, total: 0 } };
  }
});

export default specializationsRequest;
