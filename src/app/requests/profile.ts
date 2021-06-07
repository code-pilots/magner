import dataToProxy, { Response, Proxy } from 'app/proxies/login';
import api from '../../core/utils/api';
import type { BaseResponse } from '../../core/types/utils';

const profileRequest = async (): Promise<BaseResponse<Proxy>> => {
  try {
    const res: Response = await api.get('auth/profile');
    const proxied = dataToProxy(res);

    return { error: null, data: proxied };
  } catch (e) {
    return { error: 'Error', data: null };
  }
};

export default profileRequest;
