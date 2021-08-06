import { BaseComponent, BaseField } from 'core/types/form/base';

export interface DividerComponent extends BaseComponent {
  visible?: boolean,
  label?: string,
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
