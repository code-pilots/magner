import { BaseComponent, BaseField } from 'core/types/components/base';

export interface TextareaComponent extends BaseComponent {
  id?: string,
  placeholder?: string,
}

export interface TextareaField extends BaseField {
  type: 'textarea',
  component: TextareaComponent,
}
