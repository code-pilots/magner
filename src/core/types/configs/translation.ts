import { Language } from 'element-plus/lib/locale';

export interface TranslationConfig<LANGUAGES extends string> {
  /** Language used during the first website visit. Then, new language is saved to LocalStorage and used thereafter */
  mainLanguage: string,

  /** If no translation present in the current language used, use fallback */
  fallbackLanguage: string,

  /** Object with language key and its name to be used in navigation 'change language dropdown'  */
  languages: Record<LANGUAGES, string>,

  /** Custom translation following the i18n standards */
  translation: Record<LANGUAGES, any>,

  /** Element-ui locales. Import them as:<br>
   * import ruLocale from 'element-plus/lib/locale/lang/ru';
   */
  elLocales: Record<LANGUAGES, Language>,
}
