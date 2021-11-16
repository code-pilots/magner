import type { SupportedDataTypes } from 'lib/utils/form/form';
import type { TranslateData } from 'lib/utils/core/translate';
import type { MixedChecker } from 'lib/utils/core/mixed-check';
import type { SupportedValidators } from '../configs/development';
import type { DialogForm } from './dialog-forms';
import type { GenericComponent, GenericForm } from './index';

export type SupportedComponentTypes =
  'button'
  | 'input'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'select'
  | 'dropzone'
  | 'datetime'
  | 'editor'
  | 'collection'
  | 'custom';

export interface BaseProps {
  class?: string,

  /** Whether the field is disabled. Accepts static boolean or the dynamic
   * MixedChecker function with access to the user's role and form's state */
  disabled?: boolean | MixedChecker,

  /** Hides the field from the form if 'true' */
  hidden?: boolean | MixedChecker,

  /** If 'true', the field gets a design made for the better readability  */
  readOnly?: boolean | MixedChecker,

  /** If `readOnly: true`, parse the value of the form field to display as a string */
  readOnlyFormatter?: (val: unknown) => string,
}

export interface BaseValidation {
  /** Choose any supported validators to speed up the validation process */
  type: SupportedValidators,

  /** An event that triggers the validation to start */
  trigger: 'blur'|'change'|'input',
}

export interface FormInteractionsData {
  form: Record<string, any>,
  getField: <FIELD extends GenericComponent = GenericComponent>(name: string) => FIELD | undefined,
  getDialogForm: <FORM = DialogForm>(name: string) => DialogForm | undefined,
  config: GenericForm,
  data?: unknown,
}
export type FieldInteractions = (arg_1: FormInteractionsData) => void

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
  props: BaseProps,

  /** How and when to validate the field */
  validation?: BaseValidation | BaseValidation[],

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
