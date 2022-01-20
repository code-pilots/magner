<template>
  <el-form-item
    v-if="!hidden && field.type !== 'collection'"
    :key="field.name"
    :prop="field.name"
    :label-width="field.label ? (isMobile ? null : '100px') : '0'"
    :error="error"
    :class="['generic-form_item', 'generic-form_item-' + field.type, 'input-' + field.name, {
      'readonly': readOnly,
      'disabled': disabled && !readOnly,
    }]"
  >
    <template v-if="field.label" #label>
      {{ customT(field.label) }}
      <span v-if="field.props.required" class="generic-form_item_required">*</span>
      <el-tooltip v-if="field.hint" :append-to-body="false" popper-class="generic-form_item_tooltip">
        <svg-icon
          size="sm"
          class="generic-form_item_help"
          core="question"
        />
        <template #content>
          <span v-html="customT(field.hint)" />
        </template>
      </el-tooltip>
    </template>

    <FormButton
      v-if="field.type === 'button'"
      v-model="val"
      :field="field"
      @action="customAction"
      @update:modelValue="updVal"
    />

    <FormInput
      v-else-if="field.type === 'input'"
      v-model="val"
      :field="field"
      @update:modelValue="updVal"
    />

    <FormTextarea
      v-if="field.type === 'textarea'"
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

    <DateTime
      v-else-if="field.type === 'datetime'"
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

    <FormEditor
      v-else-if="field.type === 'editor'"
      v-model="val"
      :field="field"
      @update:modelValue="updVal"
    />

    <template v-else-if="field.type === 'custom' && customComponent">
      <component
        :is="customComponent"
        :field="field.props"
        @action="customAction"
        @update:modelValue="updVal"
      />
    </template>
  </el-form-item>

  <div v-else-if="!hidden" :class="['form-collection', `collection-${field.name}`]">
    <template v-for="(itm, i) in val" :key="i">
      <template v-for="(layout, j) in field.layout" :key="i.toString() + j">
        <FormLayoutBlock :block="layout" :class="$attrs.class">
          <template #item="nestedField">
            <FormItem
              v-model="itm[nestedField.name]"
              :field="nestedField"
              @update:modelValue="changeCollectionItem(i, nestedField.name, $event)"
            />
          </template>

          <template v-if="j === field.layout.length - 1" #after-fields>
            <el-button
              v-if="!readOnly && field.props.firstRemovable ? true : i !== 0"
              :icon="xIcon"
              :disabled="disabled"
              type="danger"
              plain
              circle
              size="default"
              class="form-collection_remove"
              @click="changeCollectionItems(i)"
            />
          </template>
        </FormLayoutBlock>
      </template>

      <div class="flex-grow" />
    </template>

    <div v-if="!readOnly" class="form-collection_add">
      <el-button
        :icon="plusIcon"
        :disabled="disabled"
        type="primary"
        plain
        @click="changeCollectionItems('new')"
      >
        {{ t('core.card.add_more') }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  shallowRef, defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { GenericComponent } from 'lib/types/form';
import type { GenericFormLayout } from 'lib/types/form/layout';
import { collectFieldsFromLayout, fieldsToModels } from 'lib/utils/form/form';
import { useTranslate } from 'lib/utils/core/translate';
import { useMobile } from 'lib/utils/core/is-mobile';
import { useChecks } from 'lib/utils/core/mixed-check';
import PlusIcon from 'lib/assets/icons/plus.svg';
import XIcon from 'lib/assets/icons/x.svg';
import FormInput from './fields/input.vue';
import FormSelect from './fields/select.vue';
import Dropzone from './fields/dropzone.vue';
import FormRadio from './fields/radio.vue';
import FormCheckbox from './fields/checkbox.vue';
import FormSwitch from './fields/switch.vue';
import FormLayoutBlock from './layout-block.vue';
import FormTextarea from './fields/textarea.vue';
import DateTime from './fields/datetime.vue';
import FormEditor from './fields/editor.vue';
import FormButton from './fields/button.vue';

type CollectionItems = ReturnType<typeof fieldsToModels>[];

export default defineComponent({
  name: 'FormItem',
  components: {
    FormButton,
    FormEditor,
    DateTime,
    FormTextarea,
    FormLayoutBlock,
    FormSwitch,
    FormCheckbox,
    FormRadio,
    Dropzone,
    FormSelect,
    FormInput,
  },
  props: {
    field: {
      type: Object as PropType<GenericComponent<any>>,
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
    const { customT, t } = useTranslate();
    const isMobile = useMobile();
    const { hidden, readOnly, disabled } = useChecks(props.field, props.modelValue);
    const customComponent = shallowRef(props.field.type === 'custom' ? props.field.component() : null);

    const plusIcon = shallowRef(PlusIcon);
    const xIcon = shallowRef(XIcon);

    const collectionFields = collectFieldsFromLayout(props.field.type === 'collection'
      ? (props.field.layout as unknown as GenericFormLayout<any>) : []);

    const val = ref<any>(props.modelValue);
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

    /** Removes or adds the formCollection item into the FormCollection  */
    const changeCollectionItems = (num: number | 'new') => {
      if (num === 'new') {
        val.value = [...val.value, fieldsToModels(collectionFields)];
      } else {
        val.value = (val.value as CollectionItems).filter((_, i) => i !== num);
      }
      context.emit('update:modelValue', val.value);
    };

    const changeCollectionItem = () => {
      context.emit('update:modelValue', val.value);
    };

    return {
      val,
      isMobile,
      hidden,
      readOnly,
      disabled,
      customComponent,
      t,
      customT,
      plusIcon,
      xIcon,
      updVal,
      setError,
      customAction,
      changeCollectionItem,
      changeCollectionItems,
    };
  },
});
</script>
