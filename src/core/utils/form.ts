import type { GenericComponent } from 'core/types/form';
import { FormLayout, GenericFormLayout } from 'core/types/form/layout';

export type SupportedDataTypes = 'string'|'number'|'array'|'object'|'boolean';
export type DataTypeInitials = '' | null | [] | {} | false;

/**
 * If there is a field which operates a data not of a string type, it is recommended to
 * set the 'dataType' field to help the form working with the data.
 */
export const dataTypeToInitial = (dataType: SupportedDataTypes): DataTypeInitials => {
  switch (dataType) {
    case 'string':
      return '';
    case 'number':
      return null;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      return {};
    default:
      return '';
  }
};

/** Function extracts all fields from the nested layout recursively */
export const collectFieldsFromLayout = (layout: GenericFormLayout | GenericFormLayout[]): GenericComponent[] => {
  const fields: GenericComponent[] = [];

  if (Array.isArray(layout)) {
    fields.push(...layout.map((singleLayout) => collectFieldsFromLayout(singleLayout)).flat());
  } else if (layout.layout) {
    fields.push(...collectFieldsFromLayout(layout.layout));
  } else if (layout.fields) {
    fields.push(...layout.fields);
  }

  return fields;
};

/** Extract all generic components (fields) from layout */
export const layoutToFields = (layout: FormLayout): GenericComponent[] => {
  let fields: GenericComponent[];
  if (Array.isArray(layout)) {
    fields = layout;
  } else {
    fields = collectFieldsFromLayout(layout);
  }

  return fields;
};

/**
 * Creates an object with initial values for each field of a form.
 * This object is used when the form triggers the 'submit' event.
 */
export const fieldsToModels = (
  layout: FormLayout, initialData?: Record<string, any>,
): Record<string, DataTypeInitials> => {
  const fields = layoutToFields(layout);

  return fields
    .reduce((accum, currentValue) => {
      accum[currentValue.name] = initialData?.[currentValue.name]
        || dataTypeToInitial(currentValue.dataType || 'string');
      return accum;
    }, {} as Record<string, DataTypeInitials>);
};
