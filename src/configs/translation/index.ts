import { translationController } from 'core/controllers';
import enCustom from 'configs/translation/en';
import ruCustom from 'configs/translation/ru';

export type SupportedLanguages = 'ru' | 'en';

const i18n = translationController<SupportedLanguages>({
  mainLanguage: 'ru',
  fallbackLanguage: 'en',
  translation: {
    en: enCustom,
    ru: ruCustom,
  },
});

export default i18n;
