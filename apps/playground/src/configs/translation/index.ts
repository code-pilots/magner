import { translationController } from 'magner';
import { enElLocale } from 'magner/element-plus';
import enCustom from './en';

// eslint-disable-next-line no-shadow
export enum SupportedLanguages {
  ENG = 'en',
}

const i18n = translationController<SupportedLanguages>({
  mainLanguage: 'en',
  fallbackLanguage: 'en',
  languages: {
    en: 'English',
  },
  translation: {
    en: enCustom,
  },
  elLocales: {
    en: enElLocale,
  },
});

export default i18n;
