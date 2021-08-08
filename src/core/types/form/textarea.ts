import type { BaseComponent, BaseField } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/translate';

export interface TextareaComponent extends BaseComponent {
  id?: string,
  placeholder?: TranslateData,
}

export interface TextareaField extends BaseField {
  type: 'textarea',
  component: TextareaComponent,
}
