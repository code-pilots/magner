import { request } from '~/utils/request';
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

const loginRequest = request.profile(async ({ api, parseError }) => {
  const res = await api.get<Response>('auth/profile');
  if (res.error) {
    return { error: parseError(res.error) };
  }

  const proxied = dataToProxy(res.data);

  return {
    data: {
      user: proxied.user,
      token: proxied.token,
      role: proxied.role,
    },
  };
});

export default loginRequest;
