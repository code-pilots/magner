import { BaseComponent, BaseField } from '../../types/components/base';

export interface CheckboxComponent extends BaseComponent {
  id?: string,
  label?: string,
}

export interface CheckboxField extends BaseField {
  type: 'checkbox',
  component: CheckboxComponent,
}
