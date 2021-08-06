<template>
  <template v-if="isNoRowsNoColumns">
    <transition-group name="field-group" tag="div">
      <template v-for="field in (fieldsLayout[0].columns[0] || [])" :key="field.name">
        <slot name="item" v-bind="field" />
      </template>
    </transition-group>
  </template>

  <template v-else>
    <div
      v-for="(row, i) in fieldsLayout"
      :key="i"
      :class="[
        'generic-form_row',
        `generic-form_row-${row.columns.length}-columns`,
      ]"
    >
      <transition-group
        v-for="(column, j) in row.columns"
        :key="j"
        :class="['generic-form_column', 'generic-form_column-' + (i + 1)]"
        name="field-group"
        tag="div"
      >
        <template v-for="field in column" :key="field.name">
          <slot name="item" v-bind="field" />
        </template>
      </transition-group>
    </div>
  </template>
</template>

<script lang="ts">
import 'styles/pages/card.css';
import {
  computed, defineComponent, PropType,
} from 'vue';
import type { GenericComponent } from 'core/types/form';
import { fieldsToLayout } from 'core/utils/form';

export default defineComponent({
  name: 'FormLayout',
  components: {},
  props: {
    fields: {
      type: Object as PropType<GenericComponent[]>,
      required: true,
    },
    showAmount: {
      type: Number,
      default: null,
    },
  },
  setup (props) {
    const fieldsLayout = computed(() => fieldsToLayout(props.fields, props.showAmount));

    const isNoRows = computed(() => fieldsLayout.value.length === 1
      && fieldsLayout.value?.[0].columns.length > 1);
    const isNoRowsNoColumns = computed(() => fieldsLayout.value.length === 1
      && fieldsLayout.value?.[0].columns.length === 1);

    return {
      fieldsLayout,
      isNoRows,
      isNoRowsNoColumns,
    };
  },
});
</script>
