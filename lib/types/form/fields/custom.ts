import type { RouteComponent } from 'vue-router';
import type { BaseProps, BaseField } from '../base';

export interface CustomProps extends BaseProps {
  [key: string]: unknown,
}

export interface CustomField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'custom',
  component: () => RouteComponent,
  props: CustomProps,
}
