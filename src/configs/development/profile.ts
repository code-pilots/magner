import { profileRequestController } from 'core/index';

const profileRequest = profileRequestController(async () => ({
  error: null,
  data: {
    role: null,
    token: 'SAMPLE',
    user: null,
  },
}));

export default profileRequest;
