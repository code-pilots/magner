<template>
  <el-button
    :type="field.props.type || 'primary'"
    :native-type="field.props.nativeType || 'button'"
    @click="handleOpen"
  >
    {{ customT(field.props.text) }}
  </el-button>
</template>

<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue';
import type { ButtonField } from 'core/types/form/fields/button';
import { useTranslate } from 'core/utils';

export default defineComponent({
  name: 'FormButton',
  props: {
    field: {
      type: Object as PropType<ButtonField>,
      default: () => ({}),
    },
  },
  emits: ['action', 'update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();

    const handleOpen = () => {
      context.emit('action', { type: props.field.clickActionType || '' });
    };

    watchEffect(() => {
      context.emit('update:modelValue', props.field.value);
    });

    return {
      customT,
      handleOpen,
    };
  },
});
</script>
