import type { CustomTranslationSchema } from 'configs/translation/en';

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends CustomTranslationSchema {}
}
