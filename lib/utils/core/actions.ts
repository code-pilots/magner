import type {
  ActionFunc,
  ActionFuncCard,
  ActionFuncTable,
  ActionWrapper,
} from 'lib/types/utils/actions';
import globalValues from 'lib/global';
import api from '../api';

export const action: ActionFunc = (cb) => cb;
export const actionCard: ActionFuncCard = action;
export const actionTable: ActionFuncTable = action;

export const actionWrapper: ActionWrapper = async (data, cb) => cb({
  data,
  api,
  router: globalValues.router,
  lstorage: globalValues.lstorage,
});
