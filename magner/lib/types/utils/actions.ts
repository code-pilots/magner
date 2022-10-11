import type { ButtonProps } from 'lib/types/form/fields/button';
import type { RouteLocationRaw, Router, RouteLocation } from 'vue-router';
import type { LStorage } from 'lib/utils/core/local-storage';
import type { TranslateData } from 'lib/utils/core/translate';

/** Return from the action function is an error string or boolean (true = error happened) */
export type ActionReturn = TranslateData | boolean;

/**
 * Function that is passed as an argument to the ActionFunc.
 * Performs some user-defined action and returns a string error or boolean if error has happened
 */
export type ActionCallback<RESULT = any, DATA = any> = (info: {
  data: DATA,
  router: Router,
  lstorage: LStorage,
}) => Promise<ActionReturn>;

/** A wrapper around ActionCallback. Used by users as `action(() => {})`,
 * and the result is passed to the ActionWrapper */
export type ActionFunc = <RESULT = any, DATA = any, EMITTER = string>(
  cb: ActionCallback<RESULT, DATA>) => ActionCallback<RESULT, DATA>;

/** Function accepts ActionCallback and passes `data` to it. Always used to invoke actions */
export type ActionWrapper = <RESULT = any, DATA = any>(
  data: DATA, cb: ActionCallback<RESULT, DATA>) => Promise<ActionReturn>;

interface ActionButtonBase<ENTITY extends {}> {
  loading?: boolean,
  props: ButtonProps<ENTITY>,
}

/** Link actions are displayed as an `<el-button>` inside the `<router-link>` */
export interface ActionLink<ENTITY extends {}> extends ActionButtonBase<ENTITY> {
  type: 'link',
  to: ((route: RouteLocation) => RouteLocationRaw) | RouteLocationRaw,
  external?: boolean,
}

/**
 * 'Action' action buttons are simple `<el-button`s, click on which calls the `action` function,
 * waits for it to finish and emits the `emits` event to the parent component to do another action.
 */
export interface ActionAction<EMITTER = string, ENTITY = {}> extends ActionButtonBase<ENTITY> {
  type: 'action',
  action?: ActionCallback,
  emits?: EMITTER,
}

/** ActionButtons are either links or buttons. They are displayed in forms and table filters */
export type ActionButton<EMITTERS, ENTITY> = ActionLink<ENTITY> | ActionAction<EMITTERS, ENTITY>;

/**
 * Typings for the specific actions: in card form, table etc. They differ in what data is passed to them
 */

interface ActionDataBase<ENTITY extends {}> {
  form: ENTITY,
}

interface ActionCardData<ENTITY extends {}> extends ActionDataBase<ENTITY> {
  id?: string | number | Record<string, unknown>,
  isNew: boolean,
  data: null | ENTITY,
}

export type ActionFuncCard = <ENTITY extends {}, RESULT = any, EMITTER = string>(
  cb: ActionCallback<RESULT, ActionCardData<ENTITY>>) => ActionCallback<RESULT, ActionCardData<ENTITY>>;

interface ActionTableData<ENTITY extends {}> extends ActionDataBase<ENTITY> {
  selected: ENTITY[],
  pagination: {items?: number | undefined, page?: number | undefined},
  filters: ENTITY | Record<string, any>,
  sort: ENTITY | Record<string, any>,
}

export type ActionFuncTable = <ENTITY extends {}, RESULT = any, EMITTER = string>(
  cb: ActionCallback<RESULT, ActionTableData<ENTITY>>) => ActionCallback<RESULT, ActionTableData<ENTITY>>;
