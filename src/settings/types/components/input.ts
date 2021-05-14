import { BaseComponent, BaseField } from 'settings/types/components/base';

export interface InputComponent extends BaseComponent {
  id?: string,
  required?: string,
  placeholder?: string,
  type: 'text'|'number'|'email'|'password'|'tel'|string,
}

export interface InputField extends BaseField {
  type: 'input',
  component: InputComponent,
}
