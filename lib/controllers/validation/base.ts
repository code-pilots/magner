import type { Validators } from '../../types/configs';
import { translate, TranslateError } from '../../utils/core/translate';

/** Supported validation transformations */
export const validators: Validators<string> = {
  /** Special function. Works as a 'required' field and is disabled when
   * editing the entity card (to allow PATCH method) */
  empty: ({ rule, value }, callback) => {
    if ((typeof value === 'string' && value.trim() === '') || !value) {
      callback(new TranslateError(translate('core.validation.empty')));
    } else {
      callback();
    }
  },

  password: ({ rule, value }, callback) => {
    if (value.length < 6) {
      callback(new TranslateError(translate('core.validation.password')));
    } else {
      callback();
    }
  },

  email: ({ rule, value }, callback) => {
    if (!value.match(/[^@]+@[^.]+\..+/i)) {
      callback(new TranslateError(translate('core.validation.email')));
    } else {
      callback();
    }
  },
};
