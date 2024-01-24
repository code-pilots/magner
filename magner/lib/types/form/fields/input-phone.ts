import type { BaseField, BaseProps } from '../base';

export interface InputPhoneProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  /**
   * Includes the option “without mask” in dropdown
   * */
  hasWithoutMaskOption?: boolean

  /**
   * Preferred countries list, will be on top of the dropdown
   * */
  preferredCountries?: Array<string>,

  /**
   * In the dropdown, display only the countries you specify.
   * Default = undefined
   */
  onlyCountries?: string[],

  /**
   * In the dropdown, display all countries except the ones you specify here.
   * Default = null
   */
  excludeCountries?: string[],

  /**
   * Set the initial country selection by specifying it's country code.
   * */
  initialCountry?: string,

  /**
   * Additional classes to add to the parent div..
   */
  customContainer?: string;

  autofocus?: boolean,

  autocomplete?: 'off' | 'on' | string,

  /** An amount of milliseconds (put 400 for the best UX) of the delay for the 'update:modelValue' event of
   * the FormInput component to shoot after user typing finishes */
  inputDelay?: number,
}

export interface InputPhoneField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'input-phone',
  props: InputPhoneProps<ENTITY>,
}
