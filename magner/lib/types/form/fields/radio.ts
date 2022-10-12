import type { TranslateData } from 'lib/utils/core/translate';
import type { BaseField, BaseProps } from '../base';

export interface RadioProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  /** Display radio options in form of the buttons */
  radioButtons?: boolean,

  /** Whether radios should be displayed with a border around it */
  border?: boolean,

  /** Font color when button is active */
  activeTextColor?: string,

  /** Border and background color when button is active */
  fill?: string,
}

export interface RadioOption extends Record<string, any> {
  /** Text to be displayed, same as value if omitted */
  label?: TranslateData,

  /** Unique value of the Option. This value will be returned by form when submitted */
  value?: string|number|boolean|Record<string, any>,
}

export interface RadioField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'radio',
  props: RadioProps<ENTITY>,
  options: RadioOption[],
}
