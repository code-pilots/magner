<template>
  <div class="generic-form_actions">
    <slot name="actions-before" />

    <template v-for="(action, i) in actions" :key="i">
      <FormActionButton
        :action="action"
        :size="size"
        :skip-actions="skipActions"
        :request-data="requestData"
        @action="emitAction"
      />
    </template>

    <slot name="actions-after" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { ActionButton } from 'lib/types/utils/actions';
import FormActionButton from 'lib/views/components/form/form-action-button.vue';
import { ActionAction } from 'lib/types/utils/actions';

export default defineComponent({
  name: 'FormActions',
  components: { FormActionButton },
  props: {
    actions: {
      type: Array as PropType<ActionButton<string, any>[]>,
      default: () => ([]),
    },
    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default',
    },
    skipActions: {
      type: [Array, Boolean] as PropType<string[] | boolean>,
      default: () => ([]),
    },
    requestData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['action'],
  setup (props, context) {
    const emitAction = (action: ActionAction) => context.emit('action', action);

    return {
      emitAction,
    };
  },
});
</script>
