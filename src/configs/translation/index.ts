import lstorage from 'core/utils/local-storage';
import { translationController } from 'core/controllers';
import enCustom from 'configs/translation/en';
import ruCustom from 'configs/translation/ru';

// eslint-disable-next-line no-shadow
export enum SupportedLanguages {
  ENG = 'en',
  RUS = 'ru',
}

const language = lstorage.read('language') || 'ru';

const i18n = translationController<SupportedLanguages>({
  mainLanguage: language,
  fallbackLanguage: 'en',
  languages: {
    en: 'English',
    ru: 'Русский',
  },
  translation: {
    en: enCustom,
    ru: ruCustom,
  },
});

export default i18n;
