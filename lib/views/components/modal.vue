<template>
  <component
    :is="dialogComponent.component"
    v-model="modalOpen"
    v-bind="dialogComponent.props"
    @close="handleFail"
  >
    <template v-if="modalOpen">
      <component
        :is="contentComponent"
        v-bind="contentProps"
        @success="handleSuccess"
      />
    </template>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref, shallowRef,
  watchEffect,
} from 'vue';
import useDialogForm from 'lib/utils/form/use-dialog-form';
import useStore from 'lib/controllers/store/store';

export default defineComponent({
  name: 'MagnerModal',
  setup () {
    const store = useStore();
    const dialogComponent = useDialogForm(undefined, true);
    const contentComponent = shallowRef();
    const contentProps = ref();
    const modalOpen = ref(false);

    const modal = computed(() => store.state.modalData);
    watchEffect(async () => {
      if (modal.value) {
        const config = modal.value.config;
        if (config.type === 'card') {
          contentComponent.value = (await import('lib/views/pages/card.vue')).default;
          contentProps.value = { config: config.config, ...config.props };
        } else if (config.type === 'table') {
          contentComponent.value = (await import('lib/views/pages/table.vue')).default;
          contentProps.value = { config: config.config, ...config.props };
        } else if (config.type === 'custom') {
          const imported = await config.component?.();
          contentComponent.value = (imported as any)?.default || imported;
        }
        modalOpen.value = true;
      } else {
        modalOpen.value = false;
      }
    });

    const handleSuccess = (data: unknown) => {
      modal.value?.handleSuccess?.(data);
      store.dispatch('changeModalComponent', null);
    };

    const handleFail = () => {
      modal.value?.handleFail?.(null);
      store.dispatch('changeModalComponent', null);
    };

    return {
      dialogComponent,
      contentComponent,
      contentProps,
      modalOpen,
      handleSuccess,
      handleFail,
    };
  },
});
</script>
