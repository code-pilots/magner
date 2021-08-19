import type { RequestCallback } from 'core/types/utils';
import type { GenericForm } from 'core/types/form';
import type { Table } from 'core/types/components/table';
import type { TranslateData } from 'core/utils/translate';

export interface FiltersForm extends GenericForm {
  /** Display the button link for some other page like entity create or not */
  linkToCreateNew?: {
    label: TranslateData,
    routeName: string,
  },

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
}

export interface PaginationType {
  currentPage: number,
  totalItems: number,
  totalPages: number,
}

export interface TableFiltersData {
  filters: Record<string, any>,
  sort: Record<string, any>,
  pagination: PaginationType,
}

export interface TableFiltersResponse<ROW = any> {
  rows: ROW[],
  pagination: PaginationType | null,
}

export type TableRequest<ROW = any> = RequestCallback<TableFiltersResponse<ROW>, TableFiltersData>;

export interface TableConfig {
  /** Page title */
  title: TranslateData,

  /** Data request. Must return the data array in the field 'rows' and a pagination object */
  request: TableRequest,

  /** Filters configuration */
  filters: FiltersForm,

  /** Table configuration */
  table: Table,
}
