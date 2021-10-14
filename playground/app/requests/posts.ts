import { PaginationType, request, tableRequest } from 'lib/index';

export interface Post {
  id: string,
  text: string,
  image: string,
  likes: number,
  tags: string[],
  publishDate: string,
  owner: {},
}

export interface PostCreate {
  text: string,
  image: string,
  likes: number,
  tags: string[],
  owner: number,
}

interface Response<ENTITY> {
  data: ENTITY[],
  total: number,
  page: number,
  limit: number,
}

export const paginationProxy = <ENTITY>(res: Response<ENTITY>): PaginationType => ({
  totalPages: Math.ceil(res.total / res.limit),
  totalItems: res.total,
  currentPage: res.page,
});

export const readPosts = tableRequest(async ({ data, api, urlParsers }) => {
  try {
    const query = urlParsers.dataToUrl({
      limit: data.pagination?.items || 10,
      page: data.pagination?.page || 1,
      filters: data.filters,
      sort: data.sort,
    });

    const res = await api.get<Response<Post>>(`/post${query}`);

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

export const getPost = request<Post, number>(async ({ api, data, errorParser }) => {
  try {
    const res = await api.get<Post>(`/post/${data}`);
    return { data: res };
  } catch (e) {
    return { error: errorParser(e as any) };
  }
});

export const createPost = request<Post, PostCreate>(async ({ api, data, errorParser }) => {
  try {
    console.log(data);
    const res = await api.post<PostCreate, Post>('/post/create', data);
    return { data: res };
  } catch (e) {
    return { error: errorParser(e as any) };
  }
});

export const updatePost = request<Post, { id: number, post: PostCreate}>(async ({ api, data, errorParser }) => {
  try {
    const res = await api.put<PostCreate, Post>(`/post/${data.id}`, data.post);
    return { data: res };
  } catch (e) {
    return { error: errorParser(e as any) };
  }
});

export const deletePost = request<Post, { id: number, post: PostCreate}>(async ({ api, data }) => {
  try {
    const res = await api.delete<{}, Post>(`/post/${data.id}`);
    return { data: res };
  } catch (e) {
    return { error: '' };
  }
});
