import type { BaseProps, BaseField } from '../base';
import type { RouteComponent } from 'vue-router';

export interface CustomProps extends BaseProps {
  [key: string]: any,
}

export interface CustomField extends BaseField {
  type: 'custom',
  component: () => RouteComponent,
  props: CustomProps,
}
