import request from 'core/utils/request';

export const bigtestGet = request(async ({ data, router, api }) => {
  return { data: {}, error: null };
});

export const bigtestCreate = request(async ({ data, api }) => {
  return { data: {}, error: null };
});

export const bigtestUpdate = request<any, { id: number, data: any }>(async ({ data, api }) => {
  return { data: {}, error: null };
});
