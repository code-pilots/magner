import type { BaseProps, BaseField } from '../base';
import type { GenericFormLayout } from '../layout';

export interface CollectionProps extends BaseProps {
  showFirst?: boolean,
  firstRemovable?: boolean,
}

export interface CollectionField<ENTITY extends {}> extends BaseField<ENTITY> {
  type: 'collection',
  dataType: 'array',
  props: CollectionProps,
  /** Only one level of layout nesting. */
  layout: (Omit<GenericFormLayout<Record<string, any>>, 'layout'>)[],
}
