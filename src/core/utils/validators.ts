import type { GenericComponent } from 'core/types/form';
import type { SupportedDataTypes } from 'core/utils/form';

export type SupportedValidators = 'password'|'email'|'empty';
export type ValidatorFunc = (rule: SupportedValidators, value: any, callback: Function) => void;

export interface ValidationField {
  type: SupportedDataTypes,
  validator: ValidatorFunc,
  trigger: 'blur'|'change'|'input',
}

/** Supported validation transformations */
export const validators: Record<SupportedValidators, ValidatorFunc> = {
  /** Special function. Works as a 'required' field and is disabled when
   * editing the entity card (to allow PATCH method) */
  empty: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Поле не может быть пустым'));
    } else {
      callback();
    }
  },
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

type SetupFunc = (fields: GenericComponent[], allowEmpty: boolean) => Record<string, ValidationField>;

/**
 * The function goes through all the form fields and collects the 'validation' property, transforms it
 * to the function from the existing validation types and passed to the Form component as a 'rules' prop.
 */
const setupValidators: SetupFunc = (fields, allowEmpty) => fields.reduce((accum, field) => {
  if (!field.validation) return accum;
  if (field.validation.type === 'empty' && allowEmpty) return accum;

  accum[field.name] = {
    type: field.dataType || 'string',
    validator: validators[field.validation.type],
    trigger: field.validation.trigger,
  };

  return accum;
}, {} as Record<string, ValidationField>);

export default setupValidators;
