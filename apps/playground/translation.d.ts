import type { TranslationSchema } from 'core/../lib/controllers/i18n/en';
import type { CustomTranslationSchema } from 'configs/translation/en';

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends TranslationSchema, CustomTranslationSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {
    short: {
      hour: 'numeric'
      minute: 'numeric'
      second: 'numeric'
      timeZoneName: 'short'
      timezone: string
    }
  }

  // define the number format schema
  export interface DefineNumberFormat {
    currency: {
      style: 'currency'
      currencyDisplay: 'symbol'
      currency: string
    }
  }
}
