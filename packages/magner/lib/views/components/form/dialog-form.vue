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
      :loading="loading"
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
import type { DialogForm } from 'lib/types/form/dialog-forms';
import type { FormInteractionsData } from 'lib/types/form/base';
import { useMobile } from 'lib/utils/core/is-mobile';
import useDialogForm from 'lib/utils/form/use-dialog-form';
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
      type: Object as PropType<FormInteractionsData<any>>,
      required: true,
    },
  },
  emits: ['submit'],
  setup (props, context) {
    const isMobile = useMobile();
    const formComponent = useDialogForm(props.config.title, props.config.dialogOnMobile);
    const reactiveConfig = reactive(props.config);
    const loading = ref(false);

    const open = ref(reactiveConfig.open);

    const toggleOpen = (val?: boolean) => {
      val = typeof val === 'undefined' ? !open.value : val;
      open.value = val;
      reactiveConfig.open = val;
    };

    const submit = async (data: Record<string, string>) => {
      context.emit('submit', data);
      if (props.config.submitAction) {
        loading.value = true;
        await props.config.submitAction(data, props.formData);
        loading.value = false;
      }
    };

    watchEffect(() => {
      open.value = reactiveConfig.open;
    });

    return {
      open,
      isMobile,
      formComponent,
      reactiveConfig,
      loading,
      submit,
      toggleOpen,
    };
  },
});
</script>
