import type { TranslateData } from 'lib/utils/core/translate';
import type { BaseField, BaseProps } from '../base';
import type { IconImport } from 'lib/types/utils/useful';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
export type ButtonNativeType = 'button' | 'submit';

/** Interface mimicking the El-button component properties:
 * https://element-plus.org/#/en-US/component/button */
export interface ButtonProps extends BaseProps {
  /** Button content */
  text: TranslateData,

  /** Default is 'primary' */
  type?: ButtonType,

  /** submit is default for forms, button otherwise */
  nativeType?: ButtonNativeType,

  /** Displays button with the half-transparent background fill (not a bright button) */
  plain?: boolean,

  /** Whether the button has round borders */
  round?: boolean,

  /**
   * Icon as a Vue component.
   * Used as `() => SomeIcon` or  `() => import('../smt.svg'))`
   */
  icon?: IconImport,
}

/** Button, if used in the form, does not return any value by itself and acts as a custom component.
 * Therefore, you can use it along with a dialogForm: open it, edit, and get some value that the button will return.
 * To correctly return the value, the dialog form should change the 'button.props.value' property */
export interface ButtonField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'button',
  props: ButtonProps,

  /** This string is prompted to the button's 'changeAction' function in 'data.type' argument */
  clickActionType?: string,

  /** This value will be dynamically prompted to the form values any time it is changed
   * (by whatever component from the 'changeAction') */
  value?: unknown,
}
