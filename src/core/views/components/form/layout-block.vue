<template>
  <template v-if="block.type === 'custom'">
    <component
      :is="block.component"
      v-bind="block.props"
    />
  </template>

  <template v-else-if="block.layout">
    <component
      :is="getProps(block).component"
      :class="[`generic-form_block-${block.type}`, block.class]"
      v-bind="getProps(block).props"
    >
      <div v-if="block.title" class="el-form-item__label custom-label">{{ block.title }}</div>
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
    </component>
  </template>

  <template v-else-if="block.fields && block.fields.length">
    <component
      :is="getProps(block).component"
      :class="[`generic-form_block-${block.type}`, block.class]"
      v-bind="getProps(block).props"
    >
      <div v-if="block.title" class="el-form-item__label custom-label">{{ block.title }}</div>
      <template v-for="field in block.fields" :key="field.name">
        <slot name="item" v-bind="field" />
      </template>
    </component>
  </template>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from 'vue';
import type { GenericFormLayout, FormLayoutColumn, FormLayoutRow } from 'core/types/form/layout';

export default defineComponent({
  name: 'FormLayoutBlock',
  components: {},
  props: {
    block: {
      type: [Object, Array] as PropType<GenericFormLayout>,
      required: true,
    },
  },
  setup () {
    const getProps = (block: FormLayoutRow | FormLayoutColumn) => {
      if (block.type === 'row') {
        return {
          component: 'el-row',
          props: block.component || {},
        };
      }
      return {
        component: 'el-col',
        props: block.component || {},
      };
    };

    return {
      getProps,
    };
  },
});
</script>
