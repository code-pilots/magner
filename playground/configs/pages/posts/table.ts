import { tableController, translate } from 'lib/index';
import type { Post } from '../../../app/requests/posts';

const postsTable = tableController<Post>({
  emptyText: translate('posts.not_found'),
  rowLink: (row) => ({ name: 'post', params: { id: row.id } }),
  rowSelectable: {
    rowIdKey: 'id',
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
