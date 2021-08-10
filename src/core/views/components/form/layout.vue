<template>
  <template v-if="Array.isArray(layout)">
    <transition-group name="field-group" tag="div">
      <template v-for="field in layout" :key="field.name">
        <slot name="item" v-bind="field" />
      </template>
    </transition-group>
  </template>

  <div
    v-else
  >
    khi
  </div>

  <!--<div
    v-for="(row, i) in fieldsLayout"
    :key="i"
    :class="[
      'generic-form_row',
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
  </div>-->
</template>

<script lang="ts">
import 'styles/pages/card.css';
import {
  defineComponent, PropType,
} from 'vue';
import type { FormLayout } from 'core/types/form/layout';

export default defineComponent({
  name: 'FormLayout',
  components: {},
  props: {
    layout: {
      type: [Object, Array] as PropType<FormLayout>,
      required: true,
    },
  },
});
</script>
