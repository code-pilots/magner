import type { BaseField, BaseProps } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/core/translate';

export interface RadioProps extends BaseProps {
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

  disabled?: boolean,
}

export interface RadioField extends BaseField {
  type: 'radio',
  props: RadioProps,
  options: RadioOption[],
  radioButtons?: boolean,
}
