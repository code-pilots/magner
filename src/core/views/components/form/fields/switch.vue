<template>
  <el-switch
    :model-value="val"
    :inactive-color="field.props.inactiveColor"
    :active-color="field.props.activeColor"
    :inactive-text="customT(field.props.inactiveLabel)"
    :active-text="customT(field.props.activeLabel)"
    :disabled="field.props.disabled"
    :width="field.props.width"
    :loading="loading"
    :before-change="beforeChangeHook"
    @change="changeVal"
  />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { SwitchField } from 'core/types/form/fields/switch';
import { useTranslate } from 'core/utils/translate';

export default defineComponent({
  name: 'FormSwitch',
  props: {
    field: {
      type: Object as PropType<SwitchField>,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();

    const val = ref<number|string|boolean>(props.modelValue);
    const loading = ref<boolean>(!!props.field.props.loading);

    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: number|string|boolean) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    const beforeChangeHook = async (): Promise<boolean> => {
      if (!props.field.props.beforeChange) return true;

      const newVal = !val.value;
      loading.value = true;
      const res = await props.field.props.beforeChange(newVal);
      loading.value = false;

      return res;
    };

    return {
      val,
      loading,
      customT,
      changeVal,
      beforeChangeHook,
    };
  },
});
</script>
