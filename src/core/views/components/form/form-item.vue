<template>
  <el-form-item
    :key="field.name"
    :prop="field.name"
    :required="!!field.required"
    :label="field.label || undefined"
    :label-width="field.label ? (isMobile ? null : '100px') : '0'"
    :error="error"
    :class="['generic-form_item', 'generic-form_item-' + field.type]"
  >
    <FormInput
      v-if="field.type === 'input'"
      v-model="val"
      :field="field"
      @update:value="updVal"
    />

    <FormSelect
      v-else-if="field.type === 'select'"
      v-model="val"
      :field="field"
      @update:value="updVal"
    />

    <Dropzone
      v-else-if="field.type === 'dropzone'"
      v-model="val"
      :field="field"
      @textErrors="setError"
      @update:value="updVal"
    />
  </el-form-item>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { GenericComponent } from 'core/types/form';
import useMobile from 'core/utils/is-mobile';
import FormInput from 'core/views/components/form/form-input.vue';
import FormSelect from 'core/views/components/form/select.vue';
import Dropzone from 'core/views/components/form/dropzone.vue';

export default defineComponent({
  name: 'FormItem',
  components: { Dropzone, FormSelect, FormInput },
  props: {
    field: {
      type: Object as PropType<GenericComponent>,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Object, Array] as PropType<any>,
      default: '',
    },
  },
  emits: ['update:value', 'error'],
  setup (props, context) {
    const isMobile = useMobile();

    const val = ref(props.value);
    watchEffect(() => {
      val.value = props.value;
    });

    const updVal = (newValue: any) => {
      context.emit('update:value', newValue);
    };

    const setError = (newValue: any) => {
      context.emit('error', newValue);
    };

    return {
      val,
      isMobile,
      updVal,
      setError,
    };
  },
});
</script>
