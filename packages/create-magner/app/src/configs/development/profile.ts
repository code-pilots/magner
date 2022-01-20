import { dataToProxy, Response } from 'features/login/requests';
import { request } from '~/utils/request';

const profileRequest = request.profile(async ({ api, parseError }) => {
  const res = await api.get<Response>('auth/profile');
  if (res.error) {
    return { error: parseError(res.error) };
  }

  return { data: dataToProxy(res.data) };
});

export default profileRequest;
