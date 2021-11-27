<template>
  <el-button
    :type="field.props.type || 'primary'"
    :native-type="field.props.nativeType || 'button'"
    :disabled="disabled"
    @click="handleOpen"
  >
    {{ customT(field.props.text) }}
  </el-button>
</template>

<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue';
import type { ButtonField } from 'lib/types/form/fields/button';
import { useTranslate } from 'lib/utils/core/translate';
import { useChecks } from 'lib/utils/core/mixed-check';

export default defineComponent({
  name: 'FormButton',
  props: {
    field: {
      type: Object as PropType<ButtonField<any>>,
      default: () => ({}),
    },
  },
  emits: ['action', 'update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();
    const { disabled } = useChecks(props.field);

    const handleOpen = () => {
      context.emit('action', { type: props.field.clickActionType || '' });
    };

    watchEffect(() => {
      context.emit('update:modelValue', props.field.value);
    });

    return {
      disabled,
      customT,
      handleOpen,
    };
  },
});
</script>
