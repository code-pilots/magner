<template>
  <el-switch
    :model-value="val"
    :inactive-color="field.component.inactiveColor"
    :active-color="field.component.activeColor"
    :inactive-text="customT(field.component.inactiveLabel)"
    :active-text="customT(field.component.activeLabel)"
    :disabled="field.component.disabled"
    :width="field.component.width"
    :loading="loading"
    :before-change="beforeChangeHook"
    @change="changeVal"
  >
  </el-switch>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { SwitchField } from 'core/types/form/switch';
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
    const loading = ref<boolean>(props.field.component.loading);

    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    const beforeChangeHook = async (): Promise<boolean> => {
      if (!props.field.component.beforeChange) return true;

      const newVal = !val.value;
      loading.value = true;
      const res = await props.field.component.beforeChange(newVal);
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
