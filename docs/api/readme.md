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

### `MagnerCardForm`

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

### `requestCard`

### `requestTable`

### `requestWrapper`

### `action`

### `actionCard`

### `actionTable`

### `actionWrapper`

### `openModal`

`openModal` can open any Card, Table or custom component any time on any page.

For this, pass the `ModalConfig` object as an argument with the `type` field telling
what type (card, table or custom) of content should be displayed inside a modal, and
with specific properties for each type.

`openModal` returns promise. Therefore, you can `await` it. For example, if you created
the `card` type of modal, promise either resolves to the form data and result of submitting
the form, or rejects with the error.

### `ApiError`

### `api`

### `translate`

### `useTranslate`

### `TranslateError`

### `useMobile`

### `mixedCheck`

### `useChecks`

### `magnerAlert`

### `magnerNotify`

### `magnerPrompt`

### `magnerConfirm`

### `magnerMessage`


## Types

**Project configs**

### `ProjectConfig`

### `ManifestConfig`

### `TranslationConfig`

***

**Development configuration**

### `DevelopmentConfig`

### `UrlParsers`

### `SupportedValidators`

### `ValidationField`

### `ValidatorWrapper`

***

**Routing configuration and types related to routing**

## `RoutingConfig`

## `FinalRoute`

## `FinalNoLayoutRoute`

## `Route`

## `GlobalRouting`

## `RouteCustom`

## `RoutePreset`

***

**Layouts**

## `Layout`

## `LayoutBase`

## `MainLayout`

## `MainLayoutRoute`

## `EmptyLayout`

## `EmptyLayoutRoute`

## `CustomLayout`

## `CustomLayoutRoute`

***

**Page configurations (used in routes of type 'preset')**

### `TableConfig`

### `FiltersForm`

### `PaginationType`

### `CardConfig`

### `CardTab`

### `LoginConfig`

***

**Form types**

### `GenericForm`

### `GenericComponent`

### `DialogForm`

### `FormLayout`

### `FormLayoutColumn`

### `FormLayoutRow`

***

**Fields**

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

***

**Utils**

### `TranslateData`

### `RequestFunc`

### `RequestWrapper`

### `RequestCallback`

### `ActionFunc`

### `ActionWrapper`

### `ActionCallback`

### `ApiErrorType`

### `ApiErrorData`

### `MixedChecker`
