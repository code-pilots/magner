import type { GenericComponent } from 'core/types/form';
import type { Divider } from 'core/types/form/divider';

export type SupportedDataTypes = 'string'|'number'|'array'|'object'|'boolean';
export type DataTypeInitials = '' | null | [] | {} | false;

export type FieldsRow = { divider: Divider|null, columns: GenericComponent[][] };

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
  fields: GenericComponent[], initialData?: Record<string, any>,
): Record<string, DataTypeInitials> => fields
  .reduce((accum, currentValue) => {
    accum[currentValue.name] = initialData?.[currentValue.name] || dataTypeToInitial(currentValue.dataType || 'string');
    return accum;
  }, {} as Record<string, DataTypeInitials>);

/** Group fields in rows by columns.  */
const groupFields = (fields: GenericComponent[]) => {
  const grouped = fields.reduce((accum, current) => {
    if (!accum[current.column || 1]) accum[current.column || 1] = [];

    accum[current.column || 1].push(current);
    return accum;
  }, {} as Record<number, GenericComponent[]>);

  return Object.values(grouped);
};

/**
 * Function creates a row-columns layout out of an array of form fields.
 * Firstly, it makes rows by splitting an array by chunk. Divider plays the role of such splitter.
 * Secondly, fields in each row are grouped by columns depending on the 'column' key in them.
 * Default 'column' value is 1.
 */
export const fieldsToLayout = (fields: GenericComponent[], showAmount?: number): FieldsRow[] => {
  if (showAmount) return [{ divider: null, columns: [fields.slice(0, showAmount)] }];

  // Each divider makes all previous fields go into the same row. Following fields go to the next row
  const rows = fields.reduce((accum, current) => {
    if (current.type === 'divider') {
      accum[accum.length - 1].divider = current;
      accum[accum.length] = { divider: null, fields: [] };
    } else {
      if (!accum.length) accum[0] = { divider: null, fields: [] };
      accum[accum.length - 1].fields.push(current);
    }

    return accum;
  }, [] as { divider: Divider|null, fields: GenericComponent[] }[]);

  return rows.map((row) => ({
    divider: row.divider,
    columns: groupFields(row.fields),
  })) as FieldsRow[];
};
