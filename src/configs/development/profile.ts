import { dataToProxy, Response } from 'app/requests/login';
import { profileRequestController } from 'core/controllers';

const profileRequest = profileRequestController(async ({ api }) => {
  try {
    const res: Response = await api.get('auth/profile');
    const proxied = dataToProxy(res);

    return { error: null, data: proxied };
  } catch (e) {
    return { error: 'Error', data: null };
  }
});

export default profileRequest;
