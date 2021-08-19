import type { BaseField, BaseProps } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/core/translate';

export interface CheckboxProps extends BaseProps {
  /** Minimum/Maximum number of checkbox checked */
  min?: number,
  max?: number,

  /** Font color when button is active */
  activeTextColor?: string,

  /** Border and background color when button is active */
  fill?: string,
}

export interface CheckboxOption extends Record<string, any> {
  /** Text to be displayed, same as value if omitted */
  label?: TranslateData,

  /** Unique value of the Option. This value will be returned by form when submitted */
  value?: string|number|boolean|Record<string, any>,

  disabled?: boolean,
}

export interface CheckboxField extends BaseField {
  type: 'checkbox',
  props: CheckboxProps,
  options: CheckboxOption[],
  dataType: 'array',
  checkboxButtons?: boolean,
}
