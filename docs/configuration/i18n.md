# Translation

Translation around the app is powered by *vue-i18n-next* library. For your convenience, all the translation
schemas are typed and will provide you will with all needed autocompletion for the fast work.

You can add translation to any text field in the config files. To do so, you need to import the `translate`
function. It accepts all parameters as the `t` function from *vue-i18n-next*. Read about them here:
[https://vue-i18n.intlify.dev/guide/essentials/syntax.html](https://vue-i18n.intlify.dev/guide/essentials/syntax.html).

```ts
import { formController } from 'core/controllers';
import { translate } from 'core/utils';

const formConfig = formController({
  submit: {
    text: translate('patient.submit_button'),
  },
});
```

In here, `patient.submit_button` is a translation string which is defined in the `TranslationSchema`. Check how it's
defined in the `src/configs/translation/en.ts`:

```ts
const enCustom = {
  patient: {
    submit_button: 'Submit',
  },
};

export type CustomTranslationSchema = typeof enCustom;
export default enCustom;
```

You can see that, in the end of the Schema, its type is exported. It is done for other translations. Here is the
example with Russian:

```ts
import type { CustomTranslationSchema } from './en';

const ruCustom: CustomTranslationSchema = {
  patient: {
    submit_button: 'Сохранить',
  },
}
```

Since we used the English Schema is connected with Russian language, it will have the full power over TypeScript
checks. So you will never miss the changed Schema.

## Translation in custom views

In custom components, you need to define what to translate by yourself. Use prepared Vue hook for it:

```html
<template>
  <div>
    {{ customT('hello', { msg: 'WORLD' }) }}
  </div>
</template>

<script lang="ts">
  import {defineComponent } from 'vue';
  import { useTranslate } from 'core/utils';
  
  export default defineComponent({
    setup () {
      const { customT } = useTranslate();
      
      return {
        customT,
      };
    };
  })
</script>
```

`customT` function accept string and second param (read about it [in i18n docs](https://vue-i18n.intlify.dev/guide/essentials/syntax.html)) 
and returns the value from the `translate` function.
