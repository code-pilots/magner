import type { BaseField, BaseProps } from '../base';

export interface ColorPickerProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  disabled?: boolean,
  size?: 'large' | 'default' | 'small'

  /** Color format of v-model */
  colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb'

  /** Whether to display the alpha slider */
  showAlpha?: boolean

  /** Predefined color options */
  predefine?: Array<string>
}

export interface ColorPickerField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'color-picker',
  props: ColorPickerProps<ENTITY>,
}
