import { BaseComponent, BaseField } from '../../types/components/base';

export interface TextareaComponent extends BaseComponent {
  id?: string,
  placeholder?: string,
}

export interface TextareaField extends BaseField {
  type: 'textarea',
  component: TextareaComponent,
}
