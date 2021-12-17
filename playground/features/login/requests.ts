import { profileRequestController } from 'lib/index';

interface LoginResponse {
  result: {
    success: true,
  },
  token: string,
}

const loginRequest = profileRequestController(async ({ api, data, errorParser }) => {
  try {
    const res = await api.post<{}, LoginResponse>('auth/login', data);

    return {
      data: {
        token: res.token,
        user: {},
        role: '',
      },
    };
  } catch (e) {
    return { error: errorParser(e as any) || { message: 'Something wrong happened', fields: {} } };
  }
});

export default loginRequest;
