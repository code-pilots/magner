# Forms

Forms in this universal admin panel are completely generic. Since everything is configurable with JSON,
you can take a complete advantage out of the following form hierarchy:

**Form ➝ Form Item ➝ Field**

## 1. Form

Generic forms are already used in the login page, as filters and in the card pages.
It is an Element-ui wrapper around the logic elements. Form handles fields division
by columns. It is responsible for any possible validation, error detection and form
submissions. You can always be sure the data that's going out of the form is complete
and validated.

To work with it, pass the configuration of type GenericForm to the component:

```html
<GenericForm
  :config="config.form"
  :initial-data="{field: 'val'}"
  :loading="isLoading"
  :field-errors="{field: 'some error'}"
  :error="error"
  :allow-empty-fields="false"
  :return-initial-difference="false"
  @submit="save"
/>
```

| Prop name               | Type                   | Default    | Description                                                                                                        |
|-------------------------|------------------------|------------|--------------------------------------------------------------------------------------------------------------------|
| config                  | GenericForm            | required   | Configuration object of the form with the listed fields, submit button settings etc.                               |
| initialData             | Record<string, any>    | `{}`       | Object with keys as field names and values as whatever you pass to a form field                                    |
| returnInitialDifference | boolean                | `false`    | When submitting, emit the object with modified fields only                                                         |
| loading                 | boolean                | `false`    | Whether to display the loading icon                                                                                |
| error                   | string                 | `''`       | Global form error. Displayed after all fields before the action buttons                                            |
| fieldErrors             | Record<string, string> | `{}`       | Object with keys as field names and values as error strings that is displayed next to the field (and makes it red) |
| fieldsShowAmount        | number                 | `null`     | Property trims all fields that are out of this amount                                                              |
| allowEmptyFields        | boolean                | `false`    | If the field has validation of type 'empty', skip this validation (Used in filters)                                |

## 2. Form Item

An Element-ui wrapper around the field component. It serves a very important purpose
by validating each field and distinguishing between fields and their corresponding
components. If you'd like to build your own form from scratch, then Form Item is what
you need to put on a blank page.

```html
<FormItem
  v-model="fieldValue"
  :field="field"
  :error="fieldError"
  @error="setFieldError(field.name, $event)"
/>
```

| Prop name  | Type             | Default    | Description                                                                                                                           |
|------------|------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------|
| field      | GenericComponent | required   | Field configuration. Displays different field depending on the field.type. Might be anything from checkbox to dropzone or text editor |
| error      | string           | `''`       | If not an empty field, fails the field validation and makes it red                                                                    |
| modelValue | any              | `''`       | Field value. Can be used with v-model                                                                                                 |

## 3. Field

This is the most nested component of the form. Depending on Form Item's type (GenericComponent.type),
displays different components with different logic. For now, the following fields are supported:

```ts
type GenericComponent =
  InputField
  | TextareaField
  | CheckboxField
  | RadioField
  | SelectField
  | DropzoneField
```

For documentation of each component, refer to its .vue files in the `core/views/components/form/*.vue` and also type
.ts files in `core/types/form/*.ts`
