import type { TranslateData } from 'lib/utils/core/translate';
import type { BaseField, BaseProps } from '../base';

export interface EditorProps extends BaseProps {
  id: string,
  placeholder?: TranslateData,
}

export interface EditorField extends BaseField {
  type: 'editor',
  props: EditorProps,
}
