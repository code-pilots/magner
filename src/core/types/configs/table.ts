import type { RequestFunc } from 'core/types/utils';
import type { GenericForm } from 'core/types/form';
import type { Table } from 'core/types/components/table';

export interface FiltersForm extends GenericForm {
  linkToCreateNew?: {
    label: string,
    routeName: string,
  }
}

export interface TableConfig {
  title: string,

  request: RequestFunc,
  dataField: string,

  filters: FiltersForm,

  table: Table,
}
