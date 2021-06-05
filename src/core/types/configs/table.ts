import type { RequestFunc } from '../../types/utils';
import type { GenericComponent } from '../../types/components';
import type { ButtonComponent } from '../../types/components/button';

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
