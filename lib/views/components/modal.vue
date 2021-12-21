<template>
  <component
    :is="dialogComponent.component"
    v-model="modalOpen"
    v-bind="dialogComponent.props"
  >
    <template v-if="modalOpen">
      <component
        :is="contentComponent"
        v-bind="contentProps"
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

    const modal = computed(() => store.state.modalComponent);
    watchEffect(async () => {
      if (modal.value) {
        if (modal.value.type === 'card') {
          contentComponent.value = (await import('lib/views/pages/card.vue')).default;
          contentProps.value = { config: modal.value.config, ...modal.value.props };
        } else if (modal.value.type === 'table') {
          contentComponent.value = (await import('lib/views/pages/table.vue')).default;
          contentProps.value = { config: modal.value.config, ...modal.value.props };
        } else if (modal.value.type === 'custom') {
          const imported = await modal.value.component?.();
          contentComponent.value = (imported as any)?.default || imported;
        }
        modalOpen.value = true;
      }
    });

    watchEffect(() => {
      if (!modalOpen.value) {
        store.dispatch('changeModalComponent', null);
      }
    });

    return {
      dialogComponent,
      contentComponent,
      contentProps,
      modalOpen,
    };
  },
});
</script>
