import type { BaseField, BaseProps } from '../base';
import type { TranslateData } from '../../../utils/core/translate';

export interface CheckboxProps extends BaseProps {
  /** Minimum/Maximum number of checkbox checked */
  min?: number,
  max?: number,

  /** Font color when button is active */
  activeTextColor?: string,

  /** Border and background color when button is active */
  fill?: string,

  disabled?: boolean,
}

export interface CheckboxOption extends Record<string, any> {
  /** Text to be displayed, same as value if omitted */
  label?: TranslateData,

  /** Unique value of the Option. This value will be returned by form when submitted */
  value?: string|number|boolean|Record<string, any>,
}

export interface CheckboxField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'checkbox',
  props: CheckboxProps,
  options: CheckboxOption[],
  dataType: 'array',
  checkboxButtons?: boolean,
}
