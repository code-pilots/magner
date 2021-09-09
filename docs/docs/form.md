# Forms

Generic forms are already used in the login page, as filters and in the card pages.
It is an Element-ui wrapper around the logic elements. Form allows creating nested layouts,
it is responsible for any possible validation, error detection and form
submissions. You can always be sure the data that's going out of the form is complete
and validated.

## Configuration

To understand the form configuration, let's have a look at how it's defined:

```ts
export interface GenericForm {
  /**
   * An array (preserving the order of buttons) of buttons performing different actions with the form.
   * Supports button-like configs with one additional property `action`. Possible values are:<br>
   * `action`: `'submit'` | `'cancel'` | `'remove'` | `'clear'`,
   */
  actions?: FormAction[],
  
  layout: FormLayout,

  /** Nested forms in form of dialog windows */
  dialogForms?: DialogForm[],

  /** Element-ui size of the inputs inside the form */
  size?: 'medium'|'small'|'mini',

  /**
   * Reacting to which event the form will trigger 'submit' event.
   * Case 'submit' - only on Submit button or Enter key press
   * Case 'input' – on any child component's change event
   * */
  submitEvent?: 'submit'|'input',

  /** If 'true', shows the debug window with form fields on top right corner of the form */
  debug?: boolean,
}
```

The most difficult part in here is layout. It is an infinitely-nested object with either 
another layouts or the form fields. It is recommended, if your form uses one-column linear fields flow
structure to pass the array of `FormField`s (explained later) to the layout.

Nested layout looks like this:

```ts
const form = {
  /** An array of buttons. Each type describes its own logic */
  actions: [
    {
      action: 'cancel',
    },
    {
      action: 'submit',
      type: 'primary',
      text: translate('form_test.submit_text')
    },
    {
      action: 'remove',
      type: 'danger',
    },
    {
      action: 'clear',
    },
  ],
  
  layout: {
    type: 'row',
    /** Row props are everything that could be passed to the Element-ui's row: https://element-plus.org/#/en-US/component/layout#row-attributes */
    props: { justify: 'space-between' },

    /** Second level of nested layout. Here and after, it will be an array of layouts, not the object */
    layout: [
      {
        type: 'custom',
        /** Custom props is any object. It'll be passed to the imported CustomLayout component as a 'layout' prop */
        props: { title: translate('form_test.form.custom_layout') },
        /** Vue component to import */
        component: CustomLayout,
      },

      {
        type: 'column',
        /** Column props from Element-ui's el-col: https://element-plus.org/#/en-US/component/layout#col-attributes */
        props: { span: 12, xs: 24 },
        fields: [inputField],
      },

      {
        type: 'row',
        /** Title of the layout. You can put it instead of putting labels to the fields inside the layout */
        title: 'Some layout title',
        props: { 
          /** isPaper add shadow and padding to the layout making it stand out */
          isPaper: true,
          /** Default titleType is 'label', but 'heading' will make the text big */
          titleType: 'heading',
        },
        /** Third level of nesting */
        layout: [ {...}, {...} ],
      },
    ],
  },
};
```

In here, all form is represented as a **row layout** meaning that the flow of content is in the row. By default, every row
takes 100% of the parent's width, so all other content is moved to the other line. Columns, on the other hand, are 
rendered with the vertical content flow. You can give them different widths (`span`), even for different breakpoint.
It is better explained in the Element-ui docs, so [check it out](https://element-plus.org/#/en-US/component/layout#col-attributes).

For the flexibility, you can add your own CustomLayout – a block that is going to be rendered by yourself.

## Fields

When you add the `fields` array to the configured form layout, first thing you will define is field's `type`:
* `button` – simple button that should prompt some action interacting with other fields
* `input` – text field with masking
* `textarea` – long text field
* `editor` – Editor.js long text editor
* `checkbox` – group of checkboxes
* `radio` – group of radio buttons
* `switch` – simple true/false state switch
* `select` – dropdown select with filtering or remote data retrieval
* `dropzone` – image/file upload with drag&drop and files sorting and preview
* `datetime` – date/time picker with range selection possibility
* `collection` – field collection is like a small nested form with layouts and fields. Prompts an array of nested forms 
* `custom` – custom field with custom actions. Read below how to integrate it into the form

And example of field usage would look as follows:

```ts
const textareaField = {
  type: 'textarea',
  name: 'textarea',
  label: translate('form_test.form.textarea_label'),
  props: {
    placeholder: translate('form_test.form.textarea_placeholder'),
    autosize: { minRows: 3, maxRows: 5 },
    maxLength: 1024,
    showLetterLimit: true,
  },
  validation: {
    type: 'empty',
    trigger: 'blur',
  },
};
```

It is recommended for you to check the typings of the field. To check them, use "Go to definition" feature in
your IDE of choice. But generally, all fields extend the `BaseField` interface:

```ts
export interface BaseField {
  /** Choose any supported type of the field */
  type: SupportedComponentTypes,
  /** Unique name identifier of the field. It is required to be the same one incoming or outcoming to the backend */
  name: string,
  /** A label to be displayed next to the field component, use as string or translate() func */
  label?: TranslateData,
  /** Fixed label width in pixels */
  labelWidth?: string,
  /** If you need to explain what some field means, put the hint there. HTML is allowed in the tooltip */
  hint?: TranslateData,
  /** Any attributes passed to the base HTML-tag */
  props: BaseProps,
  /** How and when to validate the field */
  validation?: BaseValidation,
  /** Needed to setup initial values for the fields. Default is 'string' that returns and empty string '', but
   * different field types will require you to add specific dataTypes (f.e. checkboxes need an 'array') */
  dataType?: SupportedDataTypes,
  /** Is the field required.
   * !!! Doesn't work as expected, so use validation with type 'empty' on a field */
  required?: boolean,
  /** Hides the fields with v-show, so that Vue can display it later with some transition */
  hidden?: boolean,
  /**
   * When the field value is changed, this action is triggered. Use it to change other fields
   * configuration. Can be used in cases like dynamic displaying/disabling of hidden fields etc.
   */
  changeAction?: FieldInteractions,
}
```

When you are configuring such field, make sure to add the `name` the same way it's defined in your backend (for easiness).

Read about field validations in [the "development" controller validation section](../configuration/development.md).

## Change action

`changeAction` is an optional property of any field. It allows you to interact with the form's config when the field's
state is changed:

```ts
const ButtonField = {
  type: 'button',
  name: 'editor',
  /** Since button's component can't have the value inside of it, value is exposed here. Control it from 'changeAction' */
  value: '',
  /** Button has special property 'clickActionType'. The string that you pass there will be exposed to changeAction's 'data.type' argument */
  clickActionType: 'open-editor',
  /** When the button is clicked, it will trigger 'changeAction'. */
  changeAction: ({ getDialogForm, data }) => {
    const dialog = getDialogForm('editor');
    if (dialog && data?.type === 'open-editor') {
      dialog.open = true;
    }
  },
  props: {
    text: translate('form_test.form.editor.button_text'),
  },
};
```

In the example above, button click will trigger the dialog form (explained below) to open. 
And, when the dialog form named 'editor' would trigger submit action, its value will be passed to the button field.

`changeAction` has the only argument `data` which consists of:

```ts
export interface FormInteractionsData {
  /** Current and reactive form data where keys of the object are field names. You can change values here */
  form: Record<string, any>,
  /** Function that gets any field configuration by its name */
  getField: <FIELD extends GenericComponent = GenericComponent>(name: string) => FIELD | undefined,
  /** Function that gets any dialog form configuration by its name */
  getDialogForm: <FORM = DialogForm>(name: string) => DialogForm | undefined,
  /** Full form configuration */
  config: GenericForm,
  /** Any data passed from the form. Exists only in button or custom components */
  data?: any,
}
```

## Dialog forms

This is a kind of form inside a form. It is opened by request of another field from `changeAction` 
(like in the example above). Moreover, this form's submit event also triggers the `submitAction`.
Use it so set the submitted value to a field which opened the dialog.

```ts 
form = {
  dialogForms: [
    {
      name: 'editor',
      title: translate('form_test.form.editor.dialog_text'),
      open: false,
      /** By default, dialog form is opened on mobile screens in the drawer. If true, it will be opened in dialog */
      dialogOnMobile: true,
      submit: {
        text: translate('form_test.submit_text'),
      },
      /** If layout is an array - it's an array of fields */
      layout: [
        {
          type: 'editor',
          name: 'editor2',
          props: {
            id: 'editor2',
            placeholder: translate('form_test.form.editor.placeholder'),
          },
        },
      ],
      /** submitAction gets the opener field, sets value to it, and closes itself  */
      submitAction: (data, { getField, getDialogForm }) => {
        const custom = getField<ButtonField>('editor');
        const dialog = getDialogForm('editor');
        if (custom && dialog) {
          custom.value = data?.editor2;
          dialog.open = false;
        }
      },
    },
  ],
};
```

## Custom fields

```ts
const customField = {
  type: 'custom',
  name: 'customcomponent',
  component: () => CustomComponent,
  /** All props go to the component as 'field' property */
  props: {
    val: '',
  },
  changeAction: ({ getDialogForm, data }) => {
    // Do something in here with 'data' that you pass from the component on 'action' event
  },
};
```

There are several rules on how to define custom field in the form. Firstly, write field definition
as in the example above to the form of your need. Then, create the `.vue` file anywhere in the `app/` directory,
import it and add to the config.

The component should look like this:

```html
<template>
  <div>
    <el-button type="primary" @click="handleOpen">Create city</el-button>
    <span v-if="field.val">{{ field.val }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue';

/**
 * This is an example of the custom component used in the form. To make it properly suit the form,
 * you need to follow these rules while creating the component:
 *
 * 1) Add 'field' prop. It is an object from the config's field of type 'custom', 'props' property.
 * 2) The form has a key with field's name and its value. To change it, emit the 'update:modelValue' event
 * with new value. Make sure it matches the 'dataType' property from the config.
 * 3) You can configure validation of the field in the config. Wrapper components will display any errors occurred, so
 * there's no need to add any validations inside the component.
 * 4) If you need to interact with other fields, emit the 'action' event with any data. Then, in the config's
 * 'changeAction' field of this custom property, write the interactions. Event data will be passed there as 'data' arg.
 */
export default defineComponent({
  name: 'CustomComponent',
  props: {
    field: {
      type: Object as PropType<{ val: string }>,
      default: () => ({}),
    },
  },
  emits: ['action', 'update:modelValue'],
  setup (props, context) {
    const handleOpen = () => {
      context.emit('action', { type: 'open-dialog' });
    };

    watchEffect(() => {
      context.emit('update:modelValue', props.field.val);
    });

    return {
      handleOpen,
    };
  },
});
</script>

<style scoped>
div {
  width: 100%;
  display: flex;
}

.el-button {
  max-width: 200px ;
  margin-right: 12px;
}
</style>
```
