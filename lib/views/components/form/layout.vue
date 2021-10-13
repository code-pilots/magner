<template>
  <template v-if="Array.isArray(layout)">
    <div class="generic-form_only-fields">
      <template v-for="field in layout" :key="field.name">
        <slot name="item" v-bind="field" />
      </template>
    </div>
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
import type { FormLayout } from 'lib/types/form/layout';
import FormLayoutBlock from './layout-block.vue';

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
