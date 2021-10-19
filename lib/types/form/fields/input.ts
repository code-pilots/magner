import type { TranslateData } from 'lib/utils/core/translate';
import type { IconImport } from 'lib/types/utils/useful';
import type { BaseField, BaseProps } from '../base';

export interface InputProps extends BaseProps {
  /** Native input type as an HTML attribute. Default it `text` */
  type?: 'text'|'number'|'email'|'password'|'tel'|string,

  placeholder?: TranslateData,

  /**
   * Icon as a Vue component.
   * Used as `() => SomeIcon` or  `() => import('../smt.svg'))`
   */
  icon?: IconImport,

  /** An amount of milliseconds (put 400 for the best UX) of the delay for the 'update:modelValue' event of
   * the FormInput component to shoot after user typing finishes */
  inputDelay?: number,

  /**
   * Mask is an object to be passed to the 'maska' library: https://github.com/beholdr/maska
   * In short, these are the symbols for the mask:
   * '#' – number, 'X' – number or letter, 'S' – letter, 'A' or 'a' – uppercase or lowercase letter,
   * '!' – escape character, '*' – repeat the mask.
   * Tokens object defines new symbols for masking and their possible transformations.
   * */
  mask?: {
    mask: string|string[],
    tokens?: Record<string, {
      pattern: string,
      uppercase?: boolean,
      transform?: (char: string) => string,
    }>,
  },

  /** Whether to show the letter count in form of '5/30' if 'maxLength: 30' */
  showLetterLimit?: boolean,
  maxLength?: number,
  minLength?: number,

  /** Whether to show clear button */
  clearable?: boolean,

  autofocus?: boolean,
}

export interface InputField extends BaseField {
  type: 'input',
  props: InputProps,
}
