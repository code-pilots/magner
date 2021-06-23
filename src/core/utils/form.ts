import type { GenericComponent } from 'core/types/form';

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

/**
 * Creates an object with initial values for each field of a form.
 * This object is used when the form triggers the 'submit' event.
 */
export const fieldsToModels = (
  fields: GenericComponent[], initialData: Record<string, any>,
): Record<string, DataTypeInitials> => fields
  .reduce((accum, currentValue) => {
    accum[currentValue.name] = initialData?.[currentValue.name] || dataTypeToInitial(currentValue.dataType || 'string');
    return accum;
  }, {} as Record<string, DataTypeInitials>);
