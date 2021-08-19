import { validationController } from 'core/controllers';

/** Validations are functions that are used for form fields validation.
 * Here, you are configuring the object where key is a validation unique name and value is
 * a checking function.<br>
 *
 * First argument is a data you can use to check field value<br>
 * Second argument is callback. If callback argument is 'new Error("message")', the error will be shown over the field.
 */
const validation = validationController({
  /** Example validator showing that you can access values from other fields of the form */
  passwordConfirm: ({ value, form }, callback) => {
    if (value && form.password !== value) {
      callback(new Error('Пароли не совпадают!'));
    } else if (!value) {
      callback(new Error('Введите повтор пароля'));
    } else {
      callback();
    }
  },

  /** Phone field validation */
  phone: ({ rule, value, form }, callback) => {
    if (value === '') {
      callback(new Error('Пожалуйста, введите номер телефона'));
    } else if (!value.match(/\+7-[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}/i)) {
      callback(new Error('Неверный формат номера телефона'));
    } else {
      callback();
    }
  },
});

export default validation;
