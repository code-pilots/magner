import { tableController, translate } from 'lib/index';
import type { Post } from '../../../app/requests/posts';

const postsTable = tableController<Post>({
  emptyText: translate('patients.table.not_found'),
  // rowLink: (row) => ({ name: 'post', params: { id: row.id } }),
  columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 250,
    },
    {
      prop: 'image',
      label: 'Image',
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
      width: 200,
    },
  ],
});

export default postsTable;
