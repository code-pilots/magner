import { RequestFunc } from 'settings/types/utils';

export interface TableConfig {
  title: string,
  request: RequestFunc,
  dataField: string,
  table: {
    prop: string,
    label?: string,
    width?: number|string,
  }[],
}
