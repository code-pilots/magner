import type { TranslateData } from 'lib/utils/core/translate';
import type { BaseField, BaseProps } from '../base';

export interface CheckboxProps<ENTITY extends {}> extends BaseProps<ENTITY> {
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
}

export interface CheckboxField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'checkbox',
  props: CheckboxProps<ENTITY>,
  options: CheckboxOption[],
  dataType: 'array',
  checkboxButtons?: boolean,
}
