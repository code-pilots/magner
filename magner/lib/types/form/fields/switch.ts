import type { BaseField, BaseProps } from '../base';
import type { TranslateData } from '../../../utils/core/translate';

export interface SwitchProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  /** Text to display on the left side of the switch */
  inactiveLabel?: TranslateData,
  /** Text to display on the right side of the switch */
  activeLabel?: TranslateData,

  /** Switch's background color when not checked */
  inactiveColor?: string,
  /** Switch's background color when checked */
  activeColor?: string,

  /** The width of switch. Default is 40 */
  width?: number,

  loading?: boolean,

  /** The hook that is used when the switch state is changing. If 'false' is returned, no state change happens */
  beforeChange?: (newVal: boolean) => boolean | Promise<boolean>,
}

export interface SwitchField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'switch',
  dataType: 'boolean',
  props: SwitchProps<ENTITY>,
}
