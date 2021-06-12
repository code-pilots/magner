import type { RequestFunc, RequestWrapper } from 'core/types/utils';
import api from 'core/utils/api';
import globalValues from 'core/global';

const request: RequestFunc = (cb) => cb;

export const requestWrapper: RequestWrapper = (data, cb) => cb({
  data,
  api,
  store: globalValues.store,
  router: globalValues.router,
});

export default request;
