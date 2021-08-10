import type { SupportedDataTypes } from 'core/utils/form';
import { FormLayout } from 'core/types/form/layout';
import { layoutToFields } from 'core/utils/form';

export type SupportedValidators = 'password'|'email'|'phone'|'empty';
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
  phone: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('Пожалуйста, введите номер телефона'));
    } else if (!value.match(/\+7-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}/i)) {
      callback(new Error('Неверный формат номера телефона'));
    } else {
      callback();
    }
  },
};

type SetupFunc = (layout: FormLayout, allowEmpty: boolean) => Record<string, ValidationField>;

/**
 * The function goes through all the form fields and collects the 'validation' property, transforms it
 * to the function from the existing validation types and passed to the Form component as a 'rules' prop.
 */
const setupValidators: SetupFunc = (layout, allowEmpty) => {
  const fields = layoutToFields(layout);

  return fields.reduce((accum, field) => {
    if (!field.validation) return accum;
    if (field.validation.type === 'empty' && allowEmpty) return accum;

    accum[field.name] = {
      type: field.dataType || 'string',
      validator: validators[field.validation.type],
      trigger: field.validation.trigger,
    };

    return accum;
  }, {} as Record<string, ValidationField>);
};

export default setupValidators;
