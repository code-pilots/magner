import { createI18n } from 'vue-i18n';
import enLocale, { TranslationSchema } from 'core/controllers/i18n/en';
import ruLocale from 'core/controllers/i18n/ru';

const i18n = createI18n<false>({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en: enLocale,
    ru: ruLocale,
  },
});

export default i18n;
