<template>
  <component
    :is="formComponent.component"
    :model-value="open"
    v-bind="formComponent.props"
    @update:modelValue="toggleOpen"
  >
    <GenericForm
      :config="{
        ...reactiveConfig,
        submitEvent: 'submit',
        size: isMobile ? 'medium' : 'small',
        clearable: true,
      }"
      :initial-data="{}"
      :loading="false"
      @submit="submit"
    >
      <template #after>
        <div class="flex-grow" />
      </template>
    </GenericForm>
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  PropType, watchEffect,
} from 'vue';
import type { DialogForm } from 'core/types/form/dialog-forms';
import type { FormInteractionsData } from 'core/types/form/base';
import useMobile from 'core/utils/is-mobile';
import useDialogForm from 'core/utils/use-dialog-form';
import GenericForm from './form.vue';

export default defineComponent({
  name: 'DialogForm',
  components: { GenericForm },
  props: {
    config: {
      type: Object as PropType<DialogForm>,
      required: true,
    },
    formData: {
      type: Object as PropType<FormInteractionsData>,
      required: true,
    },
  },
  emits: ['submit'],
  setup (props, context) {
    const isMobile = useMobile();
    const formComponent = useDialogForm();
    const reactiveConfig = reactive(props.config);

    const open = ref(reactiveConfig.open);

    const toggleOpen = (val?: boolean) => {
      val = typeof val === 'undefined' ? !open.value : val;
      open.value = val;
      reactiveConfig.open = val;
    };

    const submit = (data: Record<string, string>) => {
      context.emit('submit', data);
    };

    watchEffect(() => {
      open.value = reactiveConfig.open;
    });

    return {
      open,
      isMobile,
      formComponent,
      reactiveConfig,
      submit,
      toggleOpen,
    };
  },
});
</script>
