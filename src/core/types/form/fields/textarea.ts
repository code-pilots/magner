import type { BaseField, BaseProps } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/translate';

export interface TextareaProps extends BaseProps {
  placeholder?: TranslateData,

  /** An amount of milliseconds (put 400 for the best UX) of the delay for the 'update:modelValue' event of
   * the FormInput component to shoot after user typing finishes */
  inputDelay?: number,

  /** Number of rows of textarea. Default is 2 */
  rows?: number,

  /** Whether textarea has an adaptive height. Can accept an object, e.g. { minRows: 2, maxRows: 6 } */
  autosize?: boolean | { minRows?: number, maxRows?: number },

  /** Control the resizeability */
  resize?: 'none' | 'horizontal' | 'vertical' | 'both',

  /** Whether to show the letter count in form of '5/30' if 'maxLength: 30' */
  showLetterLimit?: boolean,
  maxLength?: number,
  minLength?: number,

  /** Whether to show clear button */
  clearable?: boolean,

  disabled?: boolean,
  autofocus?: boolean,
}

export interface TextareaField extends BaseField {
  type: 'textarea',
  props: TextareaProps,
}
