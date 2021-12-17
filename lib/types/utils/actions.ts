import type { ButtonProps } from 'lib/types/form/fields/button';
import type { RouteLocationRaw, Router } from 'vue-router';
import type { ApiType } from 'lib/utils/api';
import type { LStorage } from 'lib/utils/core/local-storage';
import type { TranslateData } from 'lib/utils/core/translate';

/** Return from the action function is an error string or boolean (true = error happened) */
export type ActionReturn = TranslateData | boolean;

export type ActionCallback<RESULT = any, DATA = any> = (info: {
  data: DATA,
  api: ApiType,
  router: Router,
  lstorage: LStorage,
}) => Promise<ActionReturn>;

export type ActionFunc = <RESULT = any, DATA = any, EMITTER = string>(
  cb: ActionCallback<RESULT, DATA>) => ActionCallback<RESULT, DATA>;

export type ActionWrapper = <RESULT = any, DATA = any>(
  data: DATA, cb: ActionCallback<RESULT, DATA>) => Promise<ActionReturn>;

interface ActionButtonBase {
  loading?: boolean,
  props: ButtonProps,
}

interface ActionLink extends ActionButtonBase {
  type: 'link',
  to: ((route: RouteLocationRaw) => RouteLocationRaw) | RouteLocationRaw,
  external: boolean,
}

export interface ActionAction<EMITTER = string> extends ActionButtonBase {
  type: 'action',
  action?: ActionCallback,
  emits: EMITTER,
}

export type ActionButton<EMITTERS> = ActionLink | ActionAction<EMITTERS>;
