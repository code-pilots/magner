import { BaseComponent, BaseField } from '../../types/components/base';

export interface InputComponent extends BaseComponent {
  type: 'text'|'number'|'email'|'password'|'tel'|string,
  id?: string,
  placeholder?: string,
  icon?: string,
}

export interface InputField extends BaseField {
  type: 'input',
  component: InputComponent,
}
