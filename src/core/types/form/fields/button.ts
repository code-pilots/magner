import type { TranslateData } from 'core/utils/translate';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
export type ButtonNativeType = 'button' | 'submit';

/**
 * Interface mimicking the El-button component properties: https://element-plus.org/#/en-US/component/button
 */
export interface ButtonComponent {
  /** Button content */
  text: TranslateData,

  class?: string,

  /** primary is default */
  type?: ButtonType,

  /** submit is default for forms, button otherwise */
  nativeType?: ButtonNativeType,
}
