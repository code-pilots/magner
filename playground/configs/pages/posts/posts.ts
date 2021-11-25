import { tablePageController } from 'lib/index';
import { Post, readPosts } from '../../../app/requests/posts';
import postsFilters from './filters';
import postsTable from './table';

/**
 * Since Patients extend the 'table' route preset, it must extend TableConfig.
 * Read more about table configuration in app/configs/table.ts
 */
export default tablePageController<Post>({
  header: {},
  request: readPosts,
  filters: postsFilters,
  table: postsTable,
});
