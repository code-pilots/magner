import type { BaseProps, BaseField } from '../base';
import type { GenericFormLayout } from '../layout';

export interface CollectionProps<ENTITY extends {}> extends BaseProps<ENTITY> {
  showFirst?: boolean,
  firstRemovable?: boolean,
}

export interface CollectionField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'collection',
  dataType: 'array',
  props: CollectionProps<ENTITY>,
  /** Only one level of layout nesting. */
  layout: (Omit<GenericFormLayout<Record<string, any>>, 'layout'>)[],
}
