import { createI18n, I18n } from 'vue-i18n';
import type { TranslationConfig } from '../../types/configs/translation';
import { enLocale } from './en';
import { ruLocale } from './ru';
import globalValues from '../../global';

export type TranslationController = () => {
  i18n: I18n,
  config: TranslationConfig<any>,
};

const coreMessages = {
  en: enLocale,
  ru: ruLocale,
};

export const translationController = <SUPPORTED_LANGUAGES extends string>(
  config: TranslationConfig<SUPPORTED_LANGUAGES>,
): TranslationController => () => {
    const messages = Object.entries(config.translation).reduce((accum, current) => {
      const lang = current[0] as SUPPORTED_LANGUAGES;
      const locale = current[1] as Record<string, any>;

      if (!coreMessages[lang as keyof typeof coreMessages]) {
        throw new Error(`There is no core translation for the "${lang}" language. 
        Please, create such translation in the src/core/controllers/i18n/ directory.`);
      }

      const coreLocale = coreMessages[lang as keyof typeof coreMessages];
      accum[lang] = {
        ...coreLocale,
        ...locale,
      };

      return accum;
    }, {} as Record<SUPPORTED_LANGUAGES, any>);

    const i18n = createI18n({
      legacy: false,
      locale: (typeof window !== 'undefined' && globalValues.lstorage.read('language')) || config.mainLanguage,
      fallbackLocale: config.fallbackLanguage,
      messages,
    });

    return {
      i18n,
      config,
    };
  };
