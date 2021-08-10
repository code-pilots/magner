<template>
  <div v-if="block.layout" :class="[`generic-form_block-${block.type}`]">
    <template
      v-for="(nestedBlock, i) in block.layout"
      :key="i"
    >
      <FormLayoutBlock :block="nestedBlock">
        <template #item="item">
          <slot name="item" v-bind="item" />
        </template>
      </FormLayoutBlock>
    </template>
  </div>
  <template v-else-if="block.fields && block.fields.length">
    <transition-group name="field-group" tag="div" :class="[`generic-form_block-${block.type}`]">
      <template v-for="field in block.fields" :key="field.name">
        <slot name="item" v-bind="field" />
      </template>
    </transition-group>
  </template>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from 'vue';
import type { GenericFormLayout } from 'core/types/form/layout';

export default defineComponent({
  name: 'FormLayoutBlock',
  components: {},
  props: {
    block: {
      type: [Object, Array] as PropType<GenericFormLayout>,
      required: true,
    },
  },
});
</script>
