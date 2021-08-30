import type { Validators } from '../../types/configs';

/** Supported validation transformations */
export const validators: Validators<string> = {
  /** Special function. Works as a 'required' field and is disabled when
   * editing the entity card (to allow PATCH method) */
  empty: ({ rule, value }, callback) => {
    if (value === '') {
      callback(new Error('Поле не может быть пустым'));
    } else {
      callback();
    }
  },
  password: ({ rule, value }, callback) => {
    if (value === '') {
      callback(new Error('Пожалуйста, введите пароль'));
    } else if (value.length < 6) {
      callback(new Error('Пароль не может быть короче 6 символов'));
    } else {
      callback();
    }
  },
  email: ({ rule, value }, callback) => {
    if (value === '') {
      callback(new Error('Пожалуйста, введите Е-мейл'));
    } else if (!value.match(/[^@]+@[^.]+\..+/i)) {
      callback(new Error('Неверный формат Е-мейл'));
    } else {
      callback();
    }
  },
};
