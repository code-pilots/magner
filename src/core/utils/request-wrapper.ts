import { RequestFunc } from 'core/types/utils';
import api from 'core/utils/api';
import globalValues from 'core/global';

const requestWrapper = <T = any>(data: any, cb: RequestFunc<T>): Promise<any> => cb({
  data,
  api,
  store: globalValues.store,
  router: globalValues.router,
});

export default requestWrapper;
