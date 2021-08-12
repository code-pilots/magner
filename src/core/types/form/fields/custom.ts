import type { BaseComponent, BaseField } from 'core/types/form/base';
import type { RouteComponent } from 'vue-router';

export interface CustomComponent extends BaseComponent {
  [key: string]: any,
}

export interface CustomField extends BaseField {
  type: 'custom',
  element: () => RouteComponent,
  component: CustomComponent,
}
