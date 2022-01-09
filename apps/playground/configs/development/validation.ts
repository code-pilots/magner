import { validationController } from 'lib/index';

const validation = validationController({
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
