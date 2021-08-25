import { profileRequestController } from 'core/index';

const profileRequest = profileRequestController(async ({ api }) => {
  try {
    const res = await api.get('auth/login');

    return { error: null, data: res as any };
  } catch (e) {
    return { error: 'Error', data: null };
  }
});

export default profileRequest;
