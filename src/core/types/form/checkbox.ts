import { BaseComponent, BaseField } from 'core/types/form/base';

export interface CheckboxComponent extends BaseComponent {
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
  label?: string,

  /** Unique value of the Option. This value will be returned by form when submitted */
  value?: string|number|boolean|Record<string, any>,

  disabled?: boolean,
}

export interface CheckboxField extends BaseField {
  type: 'checkbox',
  component: CheckboxComponent,
  options: CheckboxOption[],
  dataType: 'array',
  checkboxButtons?: boolean,
}
