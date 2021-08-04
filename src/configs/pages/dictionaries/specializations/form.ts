import { formController } from 'core/controllers';
import citiesRequest from 'app/requests/citites';

const specializationsForm = formController({
  submit: {
    text: 'Сохранить',
  },
  fields: [
    {
      type: 'input',
      name: 'title',
      label: 'Название',
      column: 1,
      component: {
        type: 'text',
        placeholder: 'Иммунолог',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
    {
      type: 'input',
      name: 'type',
      label: 'Тип',
      column: 1,
      component: {
        type: 'text',
        placeholder: 'Взрослый',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },

    {
      type: 'input',
      name: 'planned_price',
      label: 'Запланированная онлайн консультация',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость',
      },
    },
    {
      type: 'input',
      name: 'planned_price_doctor',
      label: 'Запланированная онлайн консультация',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость с учетом уч. степени',
      },
    },

    {
      type: 'input',
      name: 'fast_price',
      label: 'Срочная онлайн консультация',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость',
      },
    },
    {
      type: 'input',
      name: 'fast_price_doctor',
      label: 'Срочная онлайн консультация',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость с учетом уч. степени',
      },
    },

    {
      type: 'input',
      name: 'clinic_price',
      label: 'Консультация в клинике',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость',
      },
    },
    {
      type: 'input',
      name: 'clinic_price_doctor',
      label: 'Консультация в клинике',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость с учетом уч. степени',
      },
    },

    {
      type: 'input',
      name: 'home_price',
      label: 'Консультация на дому',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость',
      },
    },
    {
      type: 'input',
      name: 'home_price_doctor',
      label: 'Консультация на дому',
      column: 1,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Стоимость с учетом уч. степени',
      },
    },
  ],
});

export default specializationsForm;
