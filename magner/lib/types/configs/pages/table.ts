import type { InnerForm } from 'lib/types/form/form';
import type { RequestCallback, RequestWrap } from 'lib/types/utils/api';
import type { Table } from 'lib/types/components/table';
import type { PageHeader } from 'lib/types/configs/pages/shared';

export type TableActions = 'update-table' | 'deselect' | 'deselect-and-update' | 'deselect-and-success';

export interface FiltersForm<ENTITY extends {}> extends InnerForm<ENTITY, TableActions> {
  /** How many filters should be displayed in the top filters row */
  fieldsShowAmount?: number,

  /** Whether filters should be saved in localstorage or not */
  saveToLocalStorage?: boolean,

  /**
   * The following fields (pagination, sort and filtersData) should have the initial data that would
   * be used on the first request to the server for table rows. It is better to define all fields with
   * data here. For example, if you have 'fullName' as a name of a filter field, add `fullName: ''` property to filters.
   */

  /** Initial pagination data */
  pagination?: {
    items: number,
    page: number,
  },

  /** Initial sorting data */
  sort?: {},

  /** Initial filters */
  filtersData: Record<string, any>,

  /** If True - show filters in a separate el-drawer panel */
  filtersInSeparatePanel?: boolean,
}

export interface PaginationType {
  currentPage: number,
  totalItems: number,
  totalPages: number,
}

export interface FiltersPagination {
  items: number,
  page: number,
}

export interface TableFiltersData {
  filters: Record<string, any>,
  sort: Record<string, any>,
  pagination: FiltersPagination,
}

export interface TableFiltersResponse<ROW = unknown> {
  rows: ROW[],
  pagination?: PaginationType | null,
}

export type TableRequestCallback<ROW = unknown> = RequestCallback<TableFiltersResponse<ROW>, TableFiltersData>;
export type TableRequestFunc = <ROW = unknown>(cb: TableRequestCallback<ROW>) =>
  RequestWrap<TableFiltersResponse<ROW>, TableFiltersData>;

export interface TableConfig<ENTITY extends {}> {
  /** Top header of a page. Consists of the page title and tabs */
  header: PageHeader,

  /** Data request. Must return the data array in the field 'rows' and a pagination object */
  request: ReturnType<TableRequestFunc>,

  /** Filters configuration */
  filters: FiltersForm<ENTITY>,

  /** Table configuration */
  table: Table<ENTITY>,
}
