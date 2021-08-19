import { request } from 'core/utils';
import { PaginationType, TableRequest } from 'core/types/configs';

interface ConsultationType {
  id: number,
  title: string,
  description: string,
  duration: number,
  cancellationAllowed: string,
}

interface Response {
  result: {
    table: {
      rows: ConsultationType[],
      totalItems: number,
      pagination: PaginationType | null,
      sortFields: string[],
    },
  },
}

const consultationTypeRequest: TableRequest<ConsultationType> = request(async ({
  data, api, store, urlParsers,
}) => {
  try {
    const query = urlParsers.dataToUrl({
      ...data.pagination,
      filters: data.filters,
      sort: data.sort,
    });

    const res: Response = await api.get(`medical-service-types${query}`);
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

export default consultationTypeRequest;
