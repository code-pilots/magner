# Translation

Translation around the app is powered by *vue-i18n-next* library. For your convenience, all the translation
schemas are typed and will provide you will all needed autocompletion for the fast work.

You can add translation to any text field in the config files. To do so, you need to import the `translate`
function. It accepts all parameters as the `t` function from *vue-i18n-next* does. Read about them here:
[https://vue-i18n.intlify.dev/guide/essentials/syntax.html](https://vue-i18n.intlify.dev/guide/essentials/syntax.html).

```ts
import { formController } from 'core/controllers';
import translate from 'core/utils/translate';

const formConfig = formController({
  submit: {
    text: translate('patient.submit_button'),
  },
});
```

In here, `patient.submit_button` is a translation string which is defined in the TranslationSchema. You can
fill it in the `src/configs/translation/en.ts`. English translation is used firstly, because its type defines
TranslationSchema and then validates all others connected languages. Go to the `ru.ts` to understand this concept – 
Russian language is linked to the English, so, if you didn't fill the predefined (in English) field, it will
prompt an error.

In custom components, you need to define what to translate by yourself. Example:

```html
<template>
  <div>
    {{ customT('hello') }}
  </div>
</template>

<script lang="ts">
  import {defineComponent } from 'vue';
  import { useTranslate } from 'core/utils/translate';
  
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

`customT` function accept string (doesn't modify it) and the return value from the `translate` function.
