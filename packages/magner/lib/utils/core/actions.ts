import type {
  ActionFunc,
  ActionFuncCard,
  ActionFuncTable,
  ActionWrapper,
} from 'lib/types/utils/actions';
import globalValues from 'lib/global';

/**
 * `action` is used in the ActionButtons in the card forms, table filters and other places. It can
 * add any user-defined action and/or emit some action to the parent component. Notice that
 * `action` function in the ActionButton is called always before the `emits`.
 *
 * For better usability, use `actionCard` in the Card page and `actionTable` in the Table page.
 */
export const action: ActionFunc = (cb) => cb;

/**
 * `actionCard` extends the logic of `action` function, but it has more useful typings and data in
 * the ActionCallback. For example, when `actionCard` is used on the Card page, you can emit
 * `'submit'` action to the parent. Pressing on this button would result in submitting the form.
 */
export const actionCard: ActionFuncCard = action;

/**
 * `actionTable` extends the logic of `action` function, but it has more useful typings and data in
 * the ActionCallback. For example, when `actionTable` is used on the Table page, you can emit
 * `'update-table'` action to the parent. Pressing on this button would result in refreshing the table.
 */
export const actionTable: ActionFuncTable = action;

/** Use this function in custom components to invoke any `action` with some `data` inside it */
export const actionWrapper: ActionWrapper = async (data, cb) => cb({
  data,
  router: globalValues.router,
  lstorage: globalValues.lstorage,
});
