import { BaseComponent, BaseField } from 'core/types/form/base';

export interface CheckboxComponent extends BaseComponent {
  id?: string,
  label?: string,
}

export interface CheckboxField extends BaseField {
  type: 'checkbox',
  component: CheckboxComponent,
}
