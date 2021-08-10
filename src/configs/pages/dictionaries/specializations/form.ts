import { formController } from 'core/controllers';

const specializationsForm = formController({
  submit: {
    text: 'Сохранить',
  },
  layout: [
    {
      type: 'input',
      name: 'title',
      label: 'Название',
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
      type: 'radio',
      name: 'type',
      label: 'Тип',
      component: {},
      options: [
        {
          value: 'all',
          label: 'Любой',
        },
        {
          value: 'adult',
          label: 'Взрослый',
        },
        {
          value: 'child',
          label: 'Ребенок',
        },
      ],
    },

    {
      type: 'input',
      name: 'planned_price',
      label: 'Запланированная онлайн консультация',
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
