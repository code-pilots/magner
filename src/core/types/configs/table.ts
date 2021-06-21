import type { RequestCallback } from 'core/types/utils';
import type { GenericForm } from 'core/types/form';
import type { Table } from 'core/types/components/table';

export interface FiltersForm extends GenericForm {
  linkToCreateNew?: {
    label: string,
    routeName: string,
  },

  filtersShowAmount?: number,

  pagination?: {
    items: number,
    page: number,
  },

  sort?: {},

  filtersData: Record<string, any>,
}

export interface TableConfig {
  title: string,

  request: RequestCallback,
  dataField: string,

  filters: FiltersForm,

  table: Table,
}
