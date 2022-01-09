import { profileRequestController } from 'magner';
import { ROLE } from '~/constants';

type ProxyFunc<BEFORE, AFTER> = (data: BEFORE) => AFTER;

interface User {
  id: string,
  name: string,
  roles: ROLE[],
}

export interface Response {
  status: boolean,
  code: number,
  msg: 'ok',

  user: {
    id: string,
    name: string,
    roles: ROLE[],
  },
  token: string,
}

export interface Proxy {
  role: string | null,
  token: string,
  user: User,
}

export const dataToProxy: ProxyFunc<Response, Proxy> = (data) => ({
  token: data.token,
  role: data.user.roles?.length ? data.user.roles[0] : null,
  user: data.user,
});

const loginRequest = profileRequestController(async ({ data, api }) => {
  try {
    const res: Response = await api.post('auth/login', data);
    const proxied = dataToProxy(res);

    return {
      data: {
        user: proxied.user,
        token: proxied.token,
        role: proxied.role,
      },
    };
  } catch (e) {
    return { error: 'Error' };
  }
});

export default loginRequest;
