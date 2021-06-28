import type { RequestCallback } from 'core/types/utils';
import type { GenericForm } from 'core/types/form';
import type { Table } from 'core/types/components/table';

export interface FiltersForm extends GenericForm {
  /** Display the button link for some other page like entity create or not */
  linkToCreateNew?: {
    label: string,
    routeName: string,
  },

  /** How many filters should be displayed in the top filters row */
  filtersShowAmount?: number,

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

export interface TableConfig {
  /** Page title */
  title: string,

  /** Data request */
  request: RequestCallback,
  /** What field in the 'request' function return has the data rows */
  dataField: string,

  /** Filters configuration */
  filters: FiltersForm,

  /** Table configuration */
  table: Table,
}
