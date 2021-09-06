import type { RequestCallback } from '../../utils/api';
import type { GenericForm } from '../../form';
import type { Table } from '../../components/table';
import type { TranslateData } from '../../../utils/core/translate';

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

export interface TableFiltersResponse<ROW = unknown> {
  rows: ROW[],
  pagination?: PaginationType | null,
}

export type TableRequestCallback<ROW = unknown> = RequestCallback<TableFiltersResponse<ROW>, TableFiltersData>;
export type TableRequest = <ROW = unknown>(cb: TableRequestCallback<ROW>) => TableRequestCallback<ROW>;

export interface TableConfig {
  /** Page title */
  title: TranslateData,

  /** Data request. Must return the data array in the field 'rows' and a pagination object */
  request: TableRequestCallback,

  /** Filters configuration */
  filters: FiltersForm,

  /** Table configuration */
  table: Table,
}
