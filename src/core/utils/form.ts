import type { GenericComponent } from '../types/components';

export type SupportedDataTypes = 'string'|'number'|'array'|'object'|'boolean';
export type DataTypeInitials = '' | null | [] | {} | false;

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

export const fieldsToModels = (fields: GenericComponent[]): Record<string, DataTypeInitials> => fields
  .reduce((accum, currentValue) => {
    accum[currentValue.backendName || currentValue.name] = dataTypeToInitial(currentValue.dataType || 'string');
    return accum;
  }, {} as Record<string, DataTypeInitials>);
