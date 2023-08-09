import type { TranslateData } from 'lib/utils/core/translate';
import type { BaseField, BaseProps } from '../base';

export interface EditorTools {
  header?: { config: Partial<{}> },
  list?: { config: Partial<{}> },
  table?: { config: Partial<{}> },
  image?: { config: Partial<{ placeholder: string }> },

  // https://www.npmjs.com/package/editorjs-text-color-plugin
  color?: {
    config: Partial<{
      customPicker: boolean,
      colorCollections: Array<string>
    }>
  },
}

export interface EditorProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  id: string,
  placeholder?: TranslateData,
  tools?: EditorTools,
}

export interface EditorField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'editor',
  props: EditorProps<ENTITY>,
}
