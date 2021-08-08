import type { BaseComponent, BaseField } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/translate';

export interface SwitchComponent extends BaseComponent {
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
  disabled?: boolean,

  /** The hook that is used when the switch state is changing. If 'false' is returned, no state change happens */
  beforeChange?: (newVal: boolean) => boolean | Promise<boolean>,
}

export interface SwitchField extends BaseField {
  type: 'switch',
  dataType: 'boolean',
  component: SwitchComponent,
}
