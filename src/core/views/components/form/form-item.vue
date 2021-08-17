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

    <template v-else-if="field.type === 'custom' && customComponent">
      <component
        :is="customComponent"
        :field="field.props"
        @action="customAction"
        @update:modelValue="updVal"
      />
    </template>
  </el-form-item>

  <template v-else>
    <template v-for="(itm, i) in collectionItems" :key="i">
      <template v-for="(layout, j) in field.layout" :key="i.toString() + j">
        <FormLayoutBlock :block="layout" :class="$attrs.class">
          <template #item="nestedField">
            <FormItem
              v-model="itm[nestedField.name]"
              :field="nestedField"
              @update:modelValue="changeCollectionItem(i, nestedField.name, $event)"
            />
          </template>
        </FormLayoutBlock>
      </template>
      <el-button
        v-if="field.props.firstRemovable ? true : i !== 0"
        type="danger"
        plain
        circle
        size="small"
        class="remove-more"
        @click="changeCollectionItems(i)"
      >
        <SvgIcon name="x" size="sm" />
      </el-button>

      <div class="flex-grow" />
    </template>

    <div class="add-more">
      <el-button
        type="primary"
        size="small"
        plain
        @click="changeCollectionItems('new')"
      >
        <SvgIcon name="plus" size="sm" />
        {{ t('core.card.add_more') }}
      </el-button>
    </div>
  </template>
</template>

<script lang="ts">
import {
  shallowRef, defineComponent, PropType, ref, watchEffect, reactive,
} from 'vue';
import type { GenericComponent } from 'core/types/form';
import type { GenericFormLayout } from 'core/types/form/layout';
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
import { collectFieldsFromLayout, fieldsToModels } from 'core/utils/form';
import FormTextarea from 'core/views/components/form/fields/textarea.vue';
import DateTime from 'core/views/components/form/fields/datetime.vue';

type CollectionItems = ReturnType<typeof fieldsToModels>[];

export default defineComponent({
  name: 'FormItem',
  components: {
    DateTime,
    FormTextarea,
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
    const { customT, t } = useTranslate();
    const isMobile = useMobile();
    const customComponent = shallowRef(props.field.type === 'custom' ? props.field.component() : null);

    const collectionLen = props.field.type === 'collection' && props.field.props.showFirst ? 1 : 0;
    const collectionFields = collectFieldsFromLayout(props.field.type === 'collection'
      ? (props.field.layout as unknown as GenericFormLayout)
      : []);
    const collectionItems = ref<CollectionItems>((new Array(collectionLen).fill(0))
      .map(() => reactive(fieldsToModels(collectionFields))));

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

    const changeCollectionItems = (num: number | 'new') => {
      if (num === 'new') {
        collectionItems.value = [...collectionItems.value, reactive(fieldsToModels(collectionFields))];
      } else {
        collectionItems.value = collectionItems.value.filter((_, i) => i !== num);
      }
      val.value = [...collectionItems.value];
      context.emit('update:modelValue', val.value);
    };

    const changeCollectionItem = () => {
      val.value = [...collectionItems.value];
      context.emit('update:modelValue', val.value);
    };

    return {
      val,
      isMobile,
      customComponent,
      collectionItems,
      t,
      customT,
      updVal,
      setError,
      customAction,
      changeCollectionItem,
      changeCollectionItems,
    };
  },
});
</script>
