import globalValues from 'core/global';
import { useI18n } from 'vue-i18n';

type TArgs = Parameters<typeof globalValues.t>

/**
 * Use this function in the configs and other non-reactive .ts files to get complete typings of i18n.
 * Returns an object that should be passed to 'translateDataToString' function in the vue component
 */
export const translate = (key: TArgs[0], params?: TArgs[1]) => ({
  key,
  params: params || null,
});

export type TranslateData = string | ReturnType<typeof translate>;

/**
 * Function applies reactive i18n to the translate data. Use it in the Vue component's setup
 * for the objects you've got from 'translate' function.
 */
export const useTranslate = () => {
  const {
    t, d, n, locale,
  } = useI18n();

  return {
    t,
    d,
    n,
    locale,
    customT: (data: TranslateData): string => {
      if (!data) return '';

      if (typeof data === 'string') {
        return data;
      }

      return data.params
        ? t(data.key, data.params)
        : t(data.key);
    },
  };
};
