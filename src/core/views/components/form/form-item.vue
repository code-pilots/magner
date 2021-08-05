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
    <template v-if="field.label" #label>
      {{ field.label }}
      <el-tooltip v-if="field.hint">
        <SvgIcon
          name="question"
          size="sm"
          class="generic-form_item_help"
        />
        <template #content>
          <span v-html="field.hint" />
        </template>
      </el-tooltip>
    </template>

    <FormInput
      v-if="field.type === 'input'"
      v-model="val"
      :field="field"
      @update:modelValue="updVal"
    />

    <FormRadio
      v-else-if="field.type === 'radio'"
      v-model="val"
      :field="field"
      @update:modelValue="updVal"
    />

    <FormSelect
      v-else-if="field.type === 'select'"
      v-model="val"
      :field="field"
      @update:modelValue="updVal"
    />

    <Dropzone
      v-else-if="field.type === 'dropzone'"
      v-model="val"
      :field="field"
      @textErrors="setError"
      @update:modelValue="updVal"
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
import FormRadio from 'core/views/components/form/radio.vue';
import SvgIcon from 'core/views/components/icon.vue';

export default defineComponent({
  name: 'FormItem',
  components: {
    SvgIcon,
    FormRadio,
    Dropzone,
    FormSelect,
    FormInput,
  },
  props: {
    field: {
      type: Object as PropType<GenericComponent>,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Object, Array] as PropType<any>,
      default: '',
    },
  },
  emits: ['update:modelValue', 'error'],
  setup (props, context) {
    const isMobile = useMobile();

    const val = ref(props.modelValue);
    watchEffect(() => {
      val.value = props.modelValue;
    });

    const updVal = (newValue: any) => {
      context.emit('update:modelValue', newValue);
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
