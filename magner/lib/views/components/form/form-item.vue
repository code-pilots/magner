<template>
  <el-form-item
    v-if="!hidden && field.type !== 'collection'"
    :key="field.name"
    :prop="field.name"
    :label-width="field.label ? (isMobile ? null : '100px') : '0'"
    :error="error"
    :rules="validatorRules"
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
      @blur="$emit('blur', $event)"
      @update:model-value="updVal"
    />

    <FormInput
      v-else-if="field.type === 'input'"
      v-model="val"
      :field="field"
      @blur="$emit('blur', $event)"
      @update:model-value="updVal"
    />

    <FormTextarea
      v-if="field.type === 'textarea'"
      v-model="val"
      :field="field"
      @blur="$emit('blur', $event)"
      @update:model-value="updVal"
    />

    <FormRadio
      v-else-if="field.type === 'radio'"
      v-model="val"
      :field="field"
      @update:model-value="updVal"
    />

    <FormCheckbox
      v-else-if="field.type === 'checkbox'"
      v-model="val"
      :field="field"
      @update:model-value="updVal"
    />

    <FormSwitch
      v-else-if="field.type === 'switch'"
      v-model="val"
      :field="field"
      @update:model-value="updVal"
    />

    <FormSelect
      v-else-if="field.type === 'select'"
      v-model="val"
      :field="field"
      :form="form"
      @blur="$emit('blur', $event)"
      @update:model-value="updVal"
    />

    <DateTime
      v-else-if="field.type === 'datetime'"
      v-model="val"
      :field="field"
      @blur="$emit('blur', $event)"
      @update:model-value="updVal"
    />

    <Dropzone
      v-else-if="field.type === 'dropzone'"
      v-model="val"
      :field="field"
      @text-errors="setError"
      @update:model-value="updVal"
    />

    <FormEditor
      v-else-if="field.type === 'editor'"
      v-model="val"
      :field="field"
      @blur="$emit('blur', $event)"
      @update:model-value="updVal"
    />

    <template v-else-if="field.type === 'custom' && customComponent">
      <component
        :is="customComponent"
        v-model="val"
        :field="field.props"
        :form="form"
        @blur="$emit('blur', $event)"
        @action="customAction"
        @update:model-value="updVal"
      />
    </template>
  </el-form-item>

  <div v-else-if="!hidden" :class="['form-collection', `collection-${field.name}`]">
    <el-form
      v-for="(itm, i) in val"
      ref="collectionFormEl"
      :key="i + val.length"
      :model="itm"
    >
      <div
        v-if="+i !== 0"
        class="flex-grow"
      />

      <template v-for="(layout, j) in field.layout" :key="i.toString() + j">
        <FormLayoutBlock :block="layout" :class="$attrs.class">
          <template #item="nestedField">
            <FormItem
              v-model="itm[nestedField.name]"
              :field="{...nestedField, parent: itm}"
              :form="form"
              @blur="blurCollectionItem(i, nestedField, $event)"
              @update:model-value="changeCollectionItem(i, nestedField, itm, $event)"
            />
          </template>

          <template
            v-if="!readOnly && j === field.layout.length - 1"
            #after-fields
          >
            <el-button
              v-if="field.props.firstRemovable ? true : i !== 0"
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
    </el-form>

    <div
      v-if="!readOnly && !hiddenCollectionAddButton"
      class="form-collection_add"
    >
      <div
        v-if="val.length"
        class="flex-grow"
      />

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
  shallowRef,
  defineComponent,
  PropType,
  ref,
  watchEffect,
  onMounted,
} from 'vue';
import type { GenericComponent } from 'lib/types/form';
import type { GenericFormLayout } from 'lib/types/form/layout';
import type { BaseValidation } from 'lib/types/form/base';
import type { FormValidator } from 'lib/types/configs/development';
import { collectFieldsFromLayout, DataTypeInitials, fieldsToModels } from 'lib/utils/form/form';
import { useMobile, useChecks, useTranslate } from 'lib/utils';
import setupValidators from 'lib/utils/form/setup-validators';
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
    form: {
      type: Object as PropType<Record<string, DataTypeInitials>>,
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
    /** Is the form used for data creation or updating */
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'error', 'action', 'blur', 'validator-register'],
  setup (props, context) {
    const { customT, t } = useTranslate();
    const isMobile = useMobile();
    const {
      hidden,
      readOnly,
      disabled,
      hiddenCollectionAddButton,
    } = useChecks(props.field, props.modelValue);
    const customComponent = shallowRef(props.field.type === 'custom' ? props.field.component() : null);

    const plusIcon = shallowRef(PlusIcon);
    const xIcon = shallowRef(XIcon);

    const collectionFormEl = ref();
    const collectionFields = collectFieldsFromLayout(props.field.type === 'collection'
      ? (props.field.layout as unknown as GenericFormLayout<any>) : []);
    const validatorRules = setupValidators(props.field, [], props.form);

    const val = ref<any>(props.modelValue);
    watchEffect(() => {
      val.value = props.modelValue;
    });

    const updVal = (newValue: any) => {
      context.emit('update:modelValue', newValue, props.field);
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
      context.emit('update:modelValue', val.value, props.field);
    };

    const validateCollectionField = (field: GenericComponent<any>, index: number, trigger: 'change' | 'blur' | 'input') => {
      const validations = ([] as BaseValidation[]).concat(field.validation || []);
      validations.forEach((rule) => {
        if (rule.trigger === trigger) {
          (collectionFormEl.value?.[index] as FormValidator).validateField?.(field.name as string);
        }
      });
    };
    const validateAllForms = async () => {
      let failed = false;
      const items = Array.isArray(collectionFormEl.value) ? collectionFormEl.value : [collectionFormEl.value] as FormValidator[];
      await Promise.all(items.map(async (el) => {
        await el?.validate?.().catch(() => { failed = true; });
      }));
      return !failed;
    };

    const changeCollectionItem = (
      index: number,
      field: GenericComponent<any>,
      currentItem: Record<string, any>,
    ) => {
      validateCollectionField(field, index, 'change');
      context.emit(
        'update:modelValue',
        val.value,
        field,
        props.field.name,
        currentItem,
      );
    };
    const blurCollectionItem = (index: number, field: GenericComponent<any>) => {
      validateCollectionField(field, index, 'blur');
      context.emit('blur', val.value);
    };

    onMounted(() => {
      context.emit('validator-register', validateAllForms);

      if (
        props.isNew
        && props.field.type === 'collection'
        && props.field.props.createFirstItemIfNew
      ) {
        changeCollectionItems('new');
      }
    });

    return {
      val,
      isMobile,
      hidden,
      readOnly,
      disabled,
      hiddenCollectionAddButton,
      customComponent,
      t,
      plusIcon,
      xIcon,
      validatorRules,
      collectionFormEl,
      validateAllForms,
      customT,
      updVal,
      setError,
      customAction,
      blurCollectionItem,
      changeCollectionItem,
      changeCollectionItems,
    };
  },
});
</script>
