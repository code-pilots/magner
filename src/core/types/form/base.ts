import type { SupportedValidators } from 'core/utils/validators';
import type { SupportedDataTypes } from 'core/utils/form';

export type SupportedComponentTypes = 'input'|'textarea'|'checkbox'|'radio'|'select';

export interface BaseComponent {}

export interface BaseValidation {
  /** Choose any supported validators to speed up the validation process */
  type: SupportedValidators,

  /** An event that triggers the validation to start */
  trigger: 'blur'|'change'|'input',
}

export interface BaseField {
  /** Choose any supported type of the field */
  type: SupportedComponentTypes,

  /** Unique name identifier of the field */
  name: string,

  /** The name used to be sent or received from backend. If no 'backendName' specified, just 'name' is used */
  backendName?: string|null,

  /** A label to be displayed next to the field component */
  label?: string,
  labelWidth?: string,

  /** Any attributes passed to the base HTML-tag */
  component: BaseComponent,

  /** How and when to validate the field. Use 'null' if no validation needed */
  validation: BaseValidation|null,

  /** Needed to setup initial values for the fields. Default is 'string' that returns and empty string '' */
  dataType?: SupportedDataTypes,

  required?: boolean,
}
