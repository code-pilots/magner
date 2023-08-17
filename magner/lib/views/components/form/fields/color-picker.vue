<template>
  <el-color-picker
    v-model="val"
    :disabled="field.props.disabled ?? false"
    :size="field.props.size ?? 'default'"
    :color-format="field.props.colorFormat ?? 'hex'"
    :show-alpha="field.props.showAlpha ?? false"
    :predefine="field.props.predefine ?? []"
    popper-class="color-picker"
    @change="changeVal"
  />
</template>

<script lang="ts">
import '../../../../assets/styles/components/color-picker.css';
import {
  defineComponent,
  PropType,
  ref,
  watch,
} from 'vue';
import type { ColorPickerField } from 'lib/types/form/fields/color-picker';

export default defineComponent({
  name: 'ColorPicker',
  props: {
    field: {
      type: Object as PropType<ColorPickerField<any>>,
      default: () => ({}),
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const val = ref<string>(props.modelValue);

    const changeVal = (newVal: any) => {
      val.value = newVal;

      context.emit('update:modelValue', val.value);
    };

    watch(() => props.modelValue, () => {
      val.value = props.modelValue;
    });

    return {
      val,
      changeVal,
    };
  },
});
</script>
