import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { I18n } from 'vue-i18n';
import type { GlobalValues } from 'lib/global';
import globalValues from '../../global';

type TArgs = Parameters<GlobalValues['t']>

/**
 * Use this function in the configs and other non-reactive .ts files to get complete typings of i18n.
 * Returns an object that should be passed to 'translateDataToString' function in the vue component
 */
export const translate = (key: TArgs[0], params?: TArgs[1]) => ({
  key,
  params: params || null,
});

/** Use a string for single-language apps or a 'translate' function with translation key */
export type TranslateData = string | { key: TArgs[0], params: TArgs[1] | null };

export const customT = (data: TranslateData, t: (arg_1: TArgs[0], arg_2?: TArgs[1]) => string): string => {
  if (!data) return '';

  if (typeof data === 'string') {
    return data;
  }

  return data.params
    ? t(data.key, data.params)
    : t(data.key);
};

type UseTranslate = () => {
  t: I18n['global']['t'],
  d: I18n['global']['d'],
  n: I18n['global']['n'],
  locale: Ref<I18n['global']['locale']>,
  customT: (data: TranslateData) => string,
};

/**
 * Function applies reactive i18n to the translate data. Use it in the Vue component's setup
 * for the objects you've got from 'translate' function.
 */
export const useTranslate: UseTranslate = () => {
  const {
    t, d, n, locale,
  } = useI18n();

  return {
    t,
    d,
    n,
    locale,
    customT: (data: TranslateData): string => customT(data, t),
  };
};

/** An error supporting translations */
export class TranslateError extends Error {
  name: string;

  constructor (name: TranslateData) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = customT(name, globalValues.t);
  }
}
