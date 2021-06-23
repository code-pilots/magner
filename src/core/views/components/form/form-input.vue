<template>
  <el-input
    ref="input"
    :model-value="val"
    :placeholder="field.component.placeholder"
    :type="field.component.type"
    @input="changeVal"
  >
    <template v-if="field.component.icon" #prefix>
      <div class="generic-form_icon">
        <svg-icon :name="field.component.icon" size="sm" />
      </div>
    </template>
  </el-input>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect, onMounted, nextTick,
} from 'vue';
import { InputField } from 'core/types/form/input';
import { create as Maska } from 'maska';

export default defineComponent({
  name: 'FormInput',
  props: {
    field: {
      type: Object as PropType<InputField>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const val = ref<number|string>(props.modelValue);
    const input = ref<HTMLInputElement>();

    watchEffect(() => {
      val.value = props.modelValue;
    });

    let mask;

    const debounceOnInput = (wait: number|undefined, cb: (arg1: string|number) => void) => {
      let timer: ReturnType<typeof setTimeout>;

      return (newVal: string|number) => {
        if (typeof wait === 'undefined') {
          cb(newVal);
          return;
        }

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          cb(newVal);
        }, wait);
      };
    };

    const changeVal = debounceOnInput(props.field.component.inputDelay, (newVal: string|number) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    });

    onMounted(() => {
      const inpEl = (input.value as any).input as HTMLInputElement;
      if (props.field.component.mask && inpEl) {
        mask = Maska(inpEl, props.field.component.mask);
      }
    });

    return {
      val,
      input,
      changeVal,
    };
  },
});
</script>
