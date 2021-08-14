<template>
  <el-form-item
    v-if="field.type !== 'collection'"
    :key="field.name"
    :prop="field.name"
    :required="!!field.required"
    :label-width="field.label ? (isMobile ? null : '100px') : '0'"
    :error="error"
    :class="['generic-form_item', 'generic-form_item-' + field.type]"
  >
    <template v-if="field.label" #label>
      {{ customT(field.label) }}
      <el-tooltip v-if="field.hint">
        <SvgIcon
          name="question"
          size="sm"
          class="generic-form_item_help"
        />
        <template #content>
          <span v-html="customT(field.hint)" />
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

    <FormCheckbox
      v-else-if="field.type === 'checkbox'"
      v-model="val"
      :field="field"
      @update:modelValue="updVal"
    />

    <FormSwitch
      v-else-if="field.type === 'switch'"
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

    <template v-else-if="field.type === 'custom' && customComponent">
      <component
        :is="customComponent"
        v-bind="field.component"
        @action="customAction"
      />
    </template>
  </el-form-item>

  <template v-else>
    <FormLayoutBlock
      v-for="(layout, i) in field.layout"
      :key="i"
      :block="layout"
    >
      <template #item="item">
        <FormItem :field="item" />
      </template>
    </FormLayoutBlock>

    <div class="add-more">
      <el-button type="primary" plain size="small">
        <SvgIcon name="plus" size="sm" />
        Add more
      </el-button>
    </div>
  </template>
</template>

<script lang="ts">
import {
  shallowRef, defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { GenericComponent } from 'core/types/form';
import useMobile from 'core/utils/is-mobile';
import { useTranslate } from 'core/utils/translate';
import SvgIcon from 'core/views/components/icon.vue';
import FormInput from 'core/views/components/form/fields/form-input.vue';
import FormSelect from 'core/views/components/form/fields/select.vue';
import Dropzone from 'core/views/components/form/fields/dropzone.vue';
import FormRadio from 'core/views/components/form/fields/radio.vue';
import FormCheckbox from 'core/views/components/form/fields/checkbox.vue';
import FormSwitch from 'core/views/components/form/fields/switch.vue';
import FormLayoutBlock from 'core/views/components/form/layout-block.vue';

export default defineComponent({
  name: 'FormItem',
  components: {
    FormLayoutBlock,
    FormSwitch,
    FormCheckbox,
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
      type: [String, Number, Object, Array, Boolean] as PropType<any>,
      default: '',
    },
  },
  emits: ['update:modelValue', 'error', 'action'],
  setup (props, context) {
    const { customT } = useTranslate();
    const isMobile = useMobile();
    const customComponent = shallowRef(props.field.type === 'custom' ? props.field.element() : null);

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

    const customAction = (e: any) => {
      context.emit('action', e);
    };

    return {
      val,
      isMobile,
      customComponent,
      customT,
      updVal,
      setError,
      customAction,
    };
  },
});
</script>
