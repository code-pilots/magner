import { BaseComponent, BaseField } from 'settings/types/components/base';

export interface CheckboxComponent extends BaseComponent {
  id?: string,
  label?: string,
}

export interface CheckboxField extends BaseField {
  type: 'checkbox',
  component: CheckboxComponent,
}
