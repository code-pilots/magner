import type { InputField } from './fields/input';
import type { TextareaField } from './fields/textarea';
import type { CheckboxField } from './fields/checkbox';
import type { RadioField } from './fields/radio';
import type { SelectField } from './fields/select';
import type { ButtonComponent } from './fields/button';
import type { DropzoneField } from './fields/dropzone';
import type { SwitchField } from './fields/switch';
import type { CustomField } from './fields/custom';
import type { CollectionField } from './fields/collection';
import type { DateTimeField } from './fields/datetime';
import type { EditorField } from './fields/editor';

import type { FormLayout } from './layout';
import type { DialogForm } from './dialog-forms';

/**
 * The type of a field used in the forms. Defined by its required 'type' which
 * can be literally anything: from text input to color picker.
 */
export type GenericComponent =
  InputField
  | TextareaField
  | CheckboxField
  | RadioField
  | SwitchField
  | SelectField
  | DropzoneField
  | DateTimeField
  | EditorField
  | CollectionField
  | CustomField;

export interface GenericForm {
  submit: ButtonComponent|null,

  layout: FormLayout,

  /**
   * Dialog forms
   */
  dialogForms?: DialogForm[],

  size?: 'medium'|'small'|'mini',

  /** Can the form be cleared? Displays a proper button */
  clearable?: boolean,

  /**
   * Reacting to which event the form will trigger 'submit' event.
   * Case 'submit' - only on Submit button or Enter key press
   * Case 'input' – on any child component's change event
   * */
  submitEvent?: 'submit'|'input',

  /** If 'true', shows the debug window with form fields on top right corner of the form */
  debug?: boolean,
}
