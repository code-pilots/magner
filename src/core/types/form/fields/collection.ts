import type { BaseProps, BaseField } from 'core/types/form/base';
import type { GenericFormLayout } from 'core/types/form/layout';

export interface CollectionProps extends BaseProps {
  showFirst?: boolean,
  firstRemovable?: boolean,
}

export interface CollectionField extends BaseField {
  type: 'collection',
  dataType: 'array',
  props: CollectionProps,
  /** Only one level of layout nesting. */
  layout: (Omit<GenericFormLayout, 'layout'>)[],
}
