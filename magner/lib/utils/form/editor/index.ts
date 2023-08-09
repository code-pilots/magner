import { API as EditorApi } from '@editorjs/editorjs';
import { EditorConfig } from '@editorjs/editorjs/types/configs/editor-config';
import { EditorTools } from 'lib/types/form/fields/editor';

const setupEditor = async (
  data: {
    holder: string,
    placeholder: string,
    autofocus?: boolean,
    data?: any,
    readOnly?: boolean,
    onReady?: () => void,
    onChange: (editor: EditorApi) => void,
  },
  tools: EditorTools | undefined,
) => {
  if (typeof window === 'undefined') return null;

  const EditorJS = (await import('@editorjs/editorjs')).default;
  const Header = (await import('@editorjs/header')).default;
  const List = (await import('@editorjs/list')).default;
  const Table = (await import('editorjs-table-readonly')).default;
  const ColorPlugin = (await import('editorjs-text-color-plugin')).default;
  const Underline = (await import('@editorjs/underline')).default;

  // @ts-ignore
  const Image = (await import('./image-block')).default;

  const colorConfig = {
    type: 'text',
    customPicker: true,
  };

  const customsTools: EditorConfig['tools'] = {
    Color: {
      class: ColorPlugin,
      config: tools?.color?.config ? {
        ...colorConfig,
        ...tools.color.config,
      } : { ...colorConfig },
    },
    underline: Underline,
  };

  const hasCustomTools = !!tools;

  if (hasCustomTools) {
    if (tools.header) {
      customsTools.header = Header;
    }

    if (tools.list) {
      customsTools.list = List;
    }

    if (tools.table) {
      customsTools.table = Table;
    }

    if (tools.image) {
      customsTools.image = {
        // @ts-ignore
        class: Image,
        inlineToolbar: true,
        config: {
          placeholder: 'Paste image URL',
          ...tools.image.config,
        },
      };
    }
  }

  const defaultTools: EditorConfig['tools'] = {
    header: Header,
    list: List,
    table: Table,
    image: {
      // @ts-ignore
      class: Image,
      inlineToolbar: true,
      config: {
        placeholder: 'Paste image URL',
      },
    },
    Color: {
      class: ColorPlugin,
      config: { ...colorConfig },
    },
    underline: Underline,
  };

  return new EditorJS({
    ...data,
    // @ts-ignore
    tools: hasCustomTools ? customsTools : defaultTools,
  });
};

export default setupEditor;
