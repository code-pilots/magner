import { BaseComponent, BaseField } from 'settings/types/components/base';

export interface TextareaComponent extends BaseComponent {
  id?: string,
  required?: string,
  placeholder?: string,
}

export interface TextareaField extends BaseField {
  type: 'textarea',
  component: TextareaComponent,
}
