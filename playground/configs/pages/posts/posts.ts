import { tablePageController, translate } from 'lib/index';
import postsRequest from '../../../app/requests/posts';
import postsFilters from './filters';
import postsTable from './table';

/**
 * Since Patients extend the 'table' route preset, it must extend TableConfig.
 * Read more about table configuration in app/configs/table.ts
 */
export default tablePageController({
  title: translate('pages.posts'),
  request: postsRequest,
  filters: postsFilters,
  table: postsTable,
});
