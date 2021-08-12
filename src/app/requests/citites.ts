import request from 'core/utils/request';
import parseError from 'app/utils/parse-error';

export interface City {
  id: number,
  name: string,
}

export const citiesGet = request(async ({ data, api }) => {
  try {
    const res = await api.get<{ result: City[] }>(`cities/search?q=${data || ''}`);

    return { error: null, data: res.result };
  } catch (e) {
    console.error(e);
    return { error: null, data: [] };
  }
});

export const citiesCreate = request(async ({ data, api }) => {
  try {
    const res = await api.post('cities', data);
    return { data: res, error: null };
  } catch (e) {
    return { error: parseError(e), data: null };
  }
});
