import type { BaseField, BaseProps } from 'core/types/form/base';
import type { TranslateData } from 'core/utils/translate';

export interface EditorProps extends BaseProps {
  id: string,
  placeholder?: TranslateData,
}

export interface EditorField extends BaseField {
  type: 'editor',
  props: EditorProps,
}
