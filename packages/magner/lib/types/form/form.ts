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
import type { ActionButton } from '../utils/actions';

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

export interface InnerForm<ENTITY extends {}, EMITTERS = string> {
  /**
   * Reacting to which event the form will trigger 'submit' event.
   * Case 'submit' - only on Submit button or Enter key press
   * Case 'input' – on any child component's change event
   * */
  submitEvent?: 'submit'|'input',

  /**
   * An array (preserving the order) of buttons performing different actions with the form.
   * You can pass links to some page or an action with an async function and 'emits' option.
   * When the button is clicked, the function is triggers with loader initiation. Finishing the function
   * emits the 'emits' event back to the form to perform Magner action, e.g. submit, clear, update table etc. Every
   * form (on card page, table filters and other) supports different 'emits' options that you can use.
   */
  actions?: ActionButton<EMITTERS>[],

  layout: FormLayout<ENTITY>,

  /**
   * Dialog forms
   */
  dialogForms?: DialogForm<any>[],

  size?: 'large' | 'default' | 'small',

  /** If 'true', shows the debug window with form fields on top right corner of the form */
  debug?: boolean,
}

export interface GenericForm<ENTITY extends {}> extends InnerForm<ENTITY, string> {}
