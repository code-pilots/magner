import { InputField } from './input';
import { TextareaField } from './textarea';

/**
 * The type of a field used in the forms. Defined by its required 'type' which
 * can be literally anything: from text input to color picker.
 */
export type GenericComponent = InputField | TextareaField;
