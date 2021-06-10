import { BaseComponent, BaseField } from 'core/types/components/base';

export interface RadioComponent extends BaseComponent {
  id?: string,
  label?: string,
}

export interface RadioField extends BaseField {
  type: 'radio',
  component: RadioComponent,
}
