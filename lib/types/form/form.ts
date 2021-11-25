import type { ButtonField } from './fields/button';
import type { InputField } from './fields/input';
import type { TextareaField } from './fields/textarea';
import type { CheckboxField } from './fields/checkbox';
import type { RadioField } from './fields/radio';
import type { SelectField } from './fields/select';
import type { DropzoneField } from './fields/dropzone';
import type { SwitchField } from './fields/switch';
import type { DateTimeField } from './fields/datetime';
import type { EditorField } from './fields/editor';
import type { CollectionField } from './fields/collection';
import type { CustomField } from './fields/custom';

import type { FormLayout } from './layout';
import type { DialogForm } from './dialog-forms';
import type { FormAction } from './actions';

/**
 * The type of a field used in the forms. Defined by its required 'type' which
 * can be literally anything: from text input to color picker.
 */
export type GenericComponent<ENTITY extends {}> =
  ButtonField<ENTITY>
  | InputField<ENTITY>
  | TextareaField<ENTITY>
  | CheckboxField<ENTITY>
  | RadioField<ENTITY>
  | SwitchField<ENTITY>
  | SelectField<ENTITY>
  | DropzoneField<ENTITY>
  | DateTimeField<ENTITY>
  | EditorField<ENTITY>
  | CollectionField<ENTITY>
  | CustomField<ENTITY>;

export interface GenericForm<ENTITY extends {}> {
  /**
   * Reacting to which event the form will trigger 'submit' event.
   * Case 'submit' - only on Submit button or Enter key press
   * Case 'input' – on any child component's change event
   * */
  submitEvent?: 'submit'|'input',

  /**
   * An array (preserving the order of buttons) of buttons performing different actions with the form.
   * Supports button-like configs with one additional property `action`. Possible values are:<br>
   * `action`: `'submit'` | `'cancel'` | `'remove'` | `'clear'`,
   */
  actions?: FormAction[],

  layout: FormLayout<ENTITY>,

  /**
   * Dialog forms
   */
  dialogForms?: DialogForm<any>[],

  size?: 'medium'|'small'|'mini',

  /** If 'true', shows the debug window with form fields on top right corner of the form */
  debug?: boolean,
}
