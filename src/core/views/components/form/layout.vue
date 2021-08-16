<template>
  <template v-if="Array.isArray(layout)">
    <transition-group name="field-group" tag="div" class="generic-form_only-fields">
      <template v-for="field in layout" :key="field.name">
        <slot name="item" v-bind="field" />
      </template>
    </transition-group>
  </template>

  <FormLayoutBlock :block="layout">
    <template #item="item">
      <slot name="item" v-bind="item" />
    </template>
  </FormLayoutBlock>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from 'vue';
import type { FormLayout } from 'core/types/form/layout';
import FormLayoutBlock from 'core/views/components/form/layout-block.vue';

export default defineComponent({
  name: 'FormLayout',
  components: { FormLayoutBlock },
  props: {
    layout: {
      type: [Object, Array] as PropType<FormLayout>,
      required: true,
    },
  },
});
</script>
