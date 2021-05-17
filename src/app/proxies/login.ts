import ROLE from 'configs/roles';
import type { User } from 'app/types/user';

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

const dataToProxy = (data: Response): Proxy => ({
  token: data.token,
  role: data.result.user.roles.length ? data.result.user.roles[0] : null,
  user: data.result.user,
});

export default dataToProxy;
