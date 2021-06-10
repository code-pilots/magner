import { BaseComponent, BaseField } from 'core/types/form/base';

export interface RadioComponent extends BaseComponent {
  id?: string,
  label?: string,
}

export interface RadioField extends BaseField {
  type: 'radio',
  component: RadioComponent,
}
