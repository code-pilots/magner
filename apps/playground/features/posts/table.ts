import { tableController, translate } from 'lib/index';
import type { Post } from './requests';

const postsTable = tableController<Post>({
  emptyText: translate('posts.not_found'),
  rowLink: (row) => ({ name: 'post', params: { id: row.id } }),
  rowSelectable: {
    rowIdKey: 'id',
    actions: [
      {
        type: 'action',
        emits: 'deselect-and-update',
        props: {
          type: 'danger',
          text: translate('posts.remove_selected'),
        },
      },
    ],
  },
  columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 250,
    },
    {
      prop: 'image',
      label: 'Image',
      view: 'image',
      width: 200,
    },
    {
      prop: 'text',
      label: 'Text',
      showOverflowTooltip: true,
    },
    {
      prop: 'likes',
      label: 'Likes',
      width: 60,
    },
    {
      prop: 'tags',
      label: 'Tags',
      view: 'tags',
      width: 300,
    },
  ],
});

export default postsTable;
