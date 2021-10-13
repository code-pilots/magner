import { PaginationType, tableRequest } from 'lib/index';

export interface Post {
  id: string,
  text: string,
  image: string,
  likes: number,
  tags: string[],
  publishDate: string,
  owner: {},
}

interface Response {
  data: Post[],
  total: number,
  page: number,
  limit: number,
}

const paginationProxy = (res: Response): PaginationType => ({
  totalPages: Math.ceil(res.total / res.limit),
  totalItems: res.total,
  currentPage: res.page,
});

const postsRequest = tableRequest(async ({ data, api, urlParsers }) => {
  try {
    const query = urlParsers.dataToUrl({
      limit: data.pagination?.items || 10,
      page: data.pagination?.page || 1,
      filters: data.filters,
      sort: data.sort,
    });

    const res: Response = await api.get<Response>(`/post${query}`);

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

export default postsRequest;
