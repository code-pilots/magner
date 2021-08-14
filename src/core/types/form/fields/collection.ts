import type { BaseComponent, BaseField } from 'core/types/form/base';
import type { GenericFormLayout } from 'core/types/form/layout';

export interface CollectionComponent extends BaseComponent {
  showFirst?: boolean,
  firstRemovable?: boolean,
}

export interface CollectionField extends BaseField {
  type: 'collection',
  dataType: 'array',
  component: CollectionComponent,
  /** Only one level of layout nesting. */
  layout: (Omit<GenericFormLayout, 'layout'>)[],
}
