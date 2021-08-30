import type { BaseField, BaseProps } from '../base';
import type { TranslateData } from '../../../utils/core/translate';

export interface EditorProps extends BaseProps {
  id: string,
  placeholder?: TranslateData,
}

export interface EditorField extends BaseField {
  type: 'editor',
  props: EditorProps,
}
