import api from 'core/utils/api';
import request from 'core/utils/request';

export interface City {
  id: number,
  name: string,
}

const citiesRequest = request(async ({ data }) => {
  try {
    const res = await api.get<{ result: City[] }>(`cities/search?q=${data || ''}`);

    return { error: null, data: res.result };
  } catch (e) {
    console.error(e);
    return { error: null, data: [] };
  }
});

export default citiesRequest;
