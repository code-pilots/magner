import type { BaseField, BaseProps } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/translate';

export interface TextareaProps extends BaseProps {
  id?: string,
  placeholder?: TranslateData,
}

export interface TextareaField extends BaseField {
  type: 'textarea',
  props: TextareaProps,
}
