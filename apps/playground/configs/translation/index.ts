import ruElLocale from 'element-plus/lib/locale/lang/ru';
import enElLocale from 'element-plus/lib/locale/lang/en';
import { translationController } from 'lib/index';
import enCustom from './en';
import ruCustom from './ru';

// eslint-disable-next-line no-shadow
export enum SupportedLanguages {
  ENG = 'en',
  RUS = 'ru',
}

const i18n = translationController<SupportedLanguages>({
  mainLanguage: 'ru',
  fallbackLanguage: 'en',
  languages: {
    en: 'English',
    ru: 'Русский',
  },
  translation: {
    en: enCustom,
    ru: ruCustom,
  },
  elLocales: {
    en: enElLocale,
    ru: ruElLocale,
  },
});

export default i18n;
