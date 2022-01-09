import { dataToProxy, Response } from 'features/login/requests';
import { profileRequestController } from 'magner';

const profileRequest = profileRequestController(async ({ api }) => {
  try {
    const res: Response = await api.get('auth/profile');
    const proxied = dataToProxy(res);

    return { data: proxied };
  } catch (e) {
    return { error: 'Error' };
  }
});

export default profileRequest;
