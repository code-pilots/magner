import type { RouteComponent } from 'vue-router';
import type { BaseProps, BaseField } from '../base';

export interface CustomProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  [key: string]: unknown,
}

export interface CustomField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'custom',
  component: () => RouteComponent,
  props: CustomProps<ENTITY>,
}
