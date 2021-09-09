# Public API

This section gives the information about the Public API of Magner – a list of functions,
Vue components and types that can be imported directly from the library.

Magner follows <a href="https://semver.org/" target="_blank">Semantic versioning</a>. Therefore,
only major versions can introduce backwards-incompatible breaking changes. Minor and Patch versions of 
the library won't affect your existing codebase.

While Magner has different functionality outside the Public API (like importing styles or static analyzers), 
it won't be discussed here. Check [documentation](../docs/) instead.

## Named exports

You can access core Magner functionality by importing named function, views and 
types straight from `'magner'` like so:

```ts
import { initMagner } from 'magner';
```

The import will take only the `initMagner` to your final code bundle since most of the modern
bundlers (Webpack, Rollup, Vite) support proper tree shaking.

You can easily distinguish between different exports by its name:
* **camelCased** exports are logical functions and controllers like `initMagner`
* Names in PascalCase starting with 'Magner' are Vue components like `MagnerForm`
* **PascalCased** exports are TypeScript types like `TablePageConfig`

**The following section explains what different import names mean and how you can work with them.**

## Controllers

Controllers are functions ерфе accept configuration object and implement some logic within the app.
You should use controllers every time you write the configuration for routing, pages etc. It will
assist you on the way with strongly typed interfaces.

### `initMagner`

Something about this

### `projectController`

Something about that

### `manifestController`

### `routerController`

### `translationController`

### `developmentController`

### `profileRequestController`

### `validationController`

### `urlParsersController`

### `errorParserController`

### `tablePageController`

### `tableController`

### `filtersFormController`

### `cardPageController`

### `formController`

### `loginPageController`

## Views

### `MagnerCardPage`

### `MagnerLoginPage`

### `MagnerTablePage`

### `MagnerMainLayout`

### `MagnerDynamic`

### `MagnerIcon`

### `MagnerHeader`

### `MagnerSidebar`

### `MagnerTable`

### `MagnerForm`

### `MagnerFormItem`

### `MagnerFormButton`

### `MagnerFormInput`

### `MagnerFormTextarea`

### `MagnerFormEditor`

### `MagnerFormCheckbox`

### `MagnerFormRadio`

### `MagnerFormSwitch`

### `MagnerFormSelect`

### `MagnerFormDateTime`

### `MagnerFormDropzone`

## Utils

### `request`

### `tableRequest`

### `requestWrapper`

### `ApiError`

### `api`

### `translate`

### `useTranslate`

### `TranslateError`

### `useMobile`

### `magnerAlert`

### `magnerNotify`

### `magnerPrompt`

### `magnerConfirm`

### `magnerMessage`


## Types

### `TableConfig`

### `FiltersForm`

### `PaginationType`

### `CardConfig`

### `CardTab`

### `LoginConfig`


### `GenericForm`

### `GenericComponent`

### `DialogForm`

### `FormLayout`

### `FormLayoutColumn`

### `FormLayoutRow`

### `ButtonField`

### `InputField`

### `TextareaField`

### `CheckboxField`

### `RadioField`

### `SelectField`

### `DropzoneField`

### `SwitchField`

### `DateTimeField`

### `EditorField`

### `CustomField`

### `CollectionField`


### `TranslateData`

### `RequestFunc`

### `RequestWrapper`

### `RequestCallback`

