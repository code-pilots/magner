const setupEditor = async (data: {
  holder: string,
  placeholder: string,
  autofocus?: boolean,
  data?: any,
  onReady?: () => void,
  onChange: () => void,
}) => {
  if (typeof window === 'undefined') return null;

  const EditorJS = (await import('@editorjs/editorjs')).default;
  const Header = (await import('@editorjs/header')).default;
  const List = (await import('@editorjs/list')).default;
  const Table = (await import('editorjs-table')).default;

  // @ts-ignore
  const Image = (await import('./image-block')).default;

  return new EditorJS({
    ...data,
    tools: {
      header: Header,
      list: List,
      table: Table,
      image: {
        class: Image,
        inlineToolbar: true,
        config: {
          placeholder: 'Paste image URL',
        },
      },
    },
  });
};

export default setupEditor;
