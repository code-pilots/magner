import type { GenericComponent } from 'lib/types/form';
import type { FormLayout, GenericFormLayout } from 'lib/types/form/layout';

export type SupportedDataTypes = 'string'|'number'|'array'|'object'|'date'|'boolean';
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
    case 'date':
      return null;
    default:
      return '';
  }
};

/** Function extracts all fields from the nested layout recursively */
export const collectFieldsFromLayout = (
  layout: GenericFormLayout<any> | GenericFormLayout<any>[],
): GenericComponent<any>[] => {
  const fields: GenericComponent<any>[] = [];

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
export const layoutToFields = (layout: FormLayout<any>): GenericComponent<Record<string, unknown>>[] => {
  let fields: GenericComponent<any>[];
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
  fields: GenericComponent<Record<string, any>>[], initialData?: Record<string, any>,
): Record<string, DataTypeInitials> => fields
  .reduce((accum, currentValue) => {
    // In case of FormCollection, get all fields in the collection, and assign initial values
    // for each form in the collection as an object
    if (currentValue.type === 'collection') {
      const collectionLen = initialData?.[currentValue.name]?.length ?? (currentValue.props.showFirst ? 1 : 0);
      const collectionFields = collectFieldsFromLayout(currentValue.layout as unknown as GenericFormLayout<any>);
      accum[currentValue.name] = (new Array(collectionLen).fill(0))
        .map((_, index) => fieldsToModels(collectionFields, (initialData?.[index] || {}) as Record<string, unknown>));
      return accum;
    }

    accum[currentValue.name] = initialData?.[currentValue.name]
      ?? dataTypeToInitial(currentValue.dataType || 'string');
    return accum;
  }, {} as Record<string, DataTypeInitials>);
