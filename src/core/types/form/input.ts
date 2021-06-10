import { BaseComponent, BaseField } from 'core/types/form/base';

export interface InputComponent extends BaseComponent {
  type: 'text'|'number'|'email'|'password'|'tel'|string,
  id?: string,
  placeholder?: string,
  icon?: string,

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
  }
}

export interface InputField extends BaseField {
  type: 'input',
  component: InputComponent,
}
