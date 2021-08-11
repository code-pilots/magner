import type { SupportedValidators } from 'core/utils/validators';
import type { SupportedDataTypes } from 'core/utils/form';
import type { GenericComponent, GenericForm } from 'core/types/form/index';
import type { TranslateData } from 'core/utils/translate';

export type SupportedComponentTypes =
  'input'
  | 'divider'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'select'
  | 'dropzone';

export interface BaseComponent {}

export interface BaseValidation {
  /** Choose any supported validators to speed up the validation process */
  type: SupportedValidators,

  /** An event that triggers the validation to start */
  trigger: 'blur'|'change'|'input',
}

export type FieldInteractions = (
  form: Record<string, any>,
  getField: <FIELD = GenericComponent>(name: string) => FIELD,
  config: GenericForm,
) => void

export interface BaseField {
  /** Choose any supported type of the field */
  type: SupportedComponentTypes,

  /** Unique name identifier of the field. It is required to be the same one incoming or outcoming to the backend */
  name: string,

  /** A label to be displayed next to the field component */
  label?: TranslateData,
  labelWidth?: string,

  /** If you need to explain what some field means, put the hint there. HTML is allowed in the tooltip */
  hint?: TranslateData,

  /** Any attributes passed to the base HTML-tag */
  component: BaseComponent,

  /** How and when to validate the field */
  validation?: BaseValidation,

  /** Needed to setup initial values for the fields. Default is 'string' that returns and empty string '' */
  dataType?: SupportedDataTypes,

  /** Is the field required.
   * !!! Doesn't work as expected, so use validation with type 'empty' on a field */
  required?: boolean,

  /** Hides the fields with v-show, so that Vue can display it later with some transition */
  hidden?: boolean,

  /**
   * When the field value is changed, this action is triggered. Use it to change other fields
   * configuration. Can be used in cases like dynamic displaying/disabling of hidden fields etc.
   */
  changeAction?: FieldInteractions,
}
