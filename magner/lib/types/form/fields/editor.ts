import type { TranslateData } from 'lib/utils/core/translate';
import type { BaseField, BaseProps } from '../base';

export interface EditorProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  id: string,
  placeholder?: TranslateData,
}

export interface EditorField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'editor',
  props: EditorProps<ENTITY>,
}
