import type { RouteComponent } from 'vue-router';
import type { BaseProps, BaseField } from '../base';

export interface CustomProps extends BaseProps {
  [key: string]: unknown,
}

export interface CustomField extends BaseField {
  type: 'custom',
  component: () => RouteComponent,
  props: CustomProps,
}
