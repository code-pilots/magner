import type { InputField } from './input';
import type { TextareaField } from './textarea';
import type { CheckboxField } from './checkbox';
import type { RadioField } from './radio';
import type { SelectField } from './select';
import type { ButtonComponent } from './button';

/**
 * The type of a field used in the forms. Defined by its required 'type' which
 * can be literally anything: from text input to color picker.
 */
export type GenericComponent =
  InputField
  | TextareaField
  | CheckboxField
  | RadioField
  | SelectField;

export interface GenericForm {
  fields: GenericComponent[],
  submit: ButtonComponent,
}
