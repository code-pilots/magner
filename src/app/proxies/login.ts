import ROLE from 'configs/roles';
import type { User } from 'app/types/user';
import type { ProxyFunc } from '../../core/types/utils';

export interface Response {
  result: {
    user: {
      id: number,
      login: string,
      phone: string,
      roleTitle: string,
      roles: ROLE[],
    },
  },
  token: string,
}

export interface Proxy {
  role: ROLE | null,
  token: string,
  user: User,
}

const dataToProxy: ProxyFunc<Response, Proxy> = (data) => ({
  token: data.token,
  role: data.result.user.roles.length ? data.result.user.roles[0] : null,
  user: data.result.user,
});

export default dataToProxy;
