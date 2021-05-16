import type { SupportedValidators } from 'settings/utils/validators';
import type { SupportedDataTypes } from 'settings/utils/form';

export type SupportedComponentTypes = 'input'|'textarea';

export interface BaseComponent {
}

export interface BaseValidation {
  type: SupportedValidators,
  trigger: 'blur'|'change'|'input',
}

export interface BaseField {
  type: SupportedComponentTypes,
  dataType?: SupportedDataTypes,
  name: string,
  backendName?: string|null,
  component: any,
  required?: boolean,
  validation: BaseValidation|null,
}
