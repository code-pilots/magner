export interface TranslationConfig<LANGUAGES extends string> {
  mainLanguage: string,
  fallbackLanguage: string,
  translation: Record<LANGUAGES, any>,
}
