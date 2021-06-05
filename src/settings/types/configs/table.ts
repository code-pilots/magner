import type { RequestFunc } from 'settings/types/utils';
import type { GenericComponent } from 'settings/types/components';
import type { ButtonComponent } from 'settings/types/components/button';

export interface TableConfig {
  title: string,
  request: RequestFunc,
  dataField: string,
  filters: GenericComponent[],
  submit: ButtonComponent,
  linkToCreateNew?: {
    label: string,
    routeName: string,
  }
  table: {
    prop: string,
    label?: string,
    width?: number|string,
  }[],
}
