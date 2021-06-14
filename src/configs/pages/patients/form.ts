import { formController } from 'core/controllers';
import citiesRequest from 'app/requests/citites';
import imageUploadRequest from 'app/requests/image-upload';

const patientForm = formController({
  submit: {
    text: 'Сохранить',
  },
  fields: [
    {
      type: 'input',
      name: 'surname',
      label: 'Фамилия',
      component: {
        type: 'text',
        placeholder: 'Иванов',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
    {
      type: 'input',
      name: 'firstname',
      label: 'Имя',
      component: {
        type: 'text',
        placeholder: 'Иван',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
    {
      type: 'input',
      name: 'patronymic',
      label: 'Отчество',
      component: {
        type: 'text',
        placeholder: 'Иванович',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
    {
      type: 'input',
      name: 'email',
      label: 'Е-мейл',
      validation: {
        type: 'email',
        trigger: 'blur',
      },
      component: {
        type: 'email',
        placeholder: 'ivanivanov@gmail.com',
        icon: 'mail',
      },
    },
    {
      type: 'input',
      name: 'phone',
      label: 'Номер телефона',
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'tel',
        placeholder: '+7-915-820-14-02',
        mask: {
          mask: '+7-###-###-##-##',
        },
      },
    },
    {
      type: 'input',
      name: 'birthDate',
      label: 'Дата рождения',
      component: {
        type: 'text',
        placeholder: '1984-12-21',
        mask: {
          mask: '####-##-##',
        },
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
    {
      type: 'select',
      name: 'gender',
      label: 'Пол',
      options: [
        {
          value: 'female',
          label: 'Женский',
        },
        {
          value: 'male',
          label: 'Мужской',
        },
      ],
      validation: null,
      component: {
        placeholder: 'Выбрать',
      },
    },

    {
      type: 'select',
      name: 'cityId',
      label: 'Город',
      component: {
        filterable: true,
        remote: true,
        remoteMethod: citiesRequest,
        valueKey: 'id',
        labelKey: 'name',
        placeholder: 'Москва',
        loadingText: 'Загрузка',
        noDataText: 'Город не найден',
      },
      options: [],
      validation: null,
    },
    {
      type: 'input',
      name: 'address',
      label: 'Адрес',
      component: {
        type: 'text',
        placeholder: 'ул. Южная, д. 14',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
    {
      type: 'input',
      name: 'apartment',
      label: 'Квартира',
      component: {
        type: 'text',
        placeholder: 'кв. 4',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },

    {
      type: 'dropzone',
      name: 'photo',
      label: 'Фотография',
      component: {
        saveToBackend: imageUploadRequest,
        valueKey: 'id',
        srcKey: 'src',
      },
      validation: null,
    },
  ],
});

export default patientForm;
