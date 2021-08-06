export interface TranslationConfig<LANGUAGES extends string> {
  mainLanguage: string,
  fallbackLanguage: string,
  languages: Record<LANGUAGES, string>,
  translation: Record<LANGUAGES, any>,
}
