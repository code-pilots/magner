import type { GenericComponent } from 'settings/types/components';
import type { SupportedDataTypes } from 'settings/utils/form';

export type SupportedValidators = 'password'|'email';
export type ValidatorFunc = (rule: SupportedValidators, value: any, callback: Function) => void;

export interface ValidationField {
  type: SupportedDataTypes,
  validator: ValidatorFunc,
  trigger: 'blur'|'change'|'input',
}

export const validators: Record<SupportedValidators, ValidatorFunc> = {
  password: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Пожалуйста, введите пароль'));
    } else if (value.length < 6) {
      callback(new Error('Пароль не может быть короче 6 символов'));
    } else {
      callback();
    }
  },
  email: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Пожалуйста, введите Е-мейл'));
    } else if (!value.match(/[^@]+@[^.]+\..+/i)) {
      callback(new Error('Неверный формат Е-мейл'));
    } else {
      callback();
    }
  },
};

const setupValidators = (fields: GenericComponent[]): Record<string, ValidationField> => {
  return fields.reduce((accum, field) => {
    if (!field.validation) return accum;

    accum[field.backendName || field.name] = {
      type: field.dataType || 'string',
      validator: validators[field.validation.type],
      trigger: field.validation.trigger,
    };

    return accum;
  }, {} as Record<string, ValidationField>);
};

export default setupValidators;
