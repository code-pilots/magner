import type { BaseComponent, BaseField } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/translate';

export interface DividerComponent extends BaseComponent {
  visible?: boolean,
  label?: TranslateData,
}

export interface Divider extends BaseField {
  type: 'divider',
  name: string,
  component: DividerComponent,

  label?: never,
  labelWidth?: never,
  hint?: never,
  column?: never,
  dataType?: never,
  validation?: never,
  required?: never,
  hidden?: never,
  changeAction?: never,
}
