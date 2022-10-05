<template>
  <template v-if="!hidden">
    <template v-if="block.type === 'custom'">
      <component
        :is="shallowComponent"
        :layout="block.props"
      />
    </template>

    <template v-else-if="block.layout">
      <component
        :is="getProps(block).component"
        :class="[
          { 'grow-elements': block.props.elementsGrow },
          `generic-form_block-${block.type}`,
          block.props.class,
          block.props.isPaper ? 'el-card is-always-shadow' : '',
        ]"
        :style="isMobile ? block.props.mobileStyles : block.props.styles"
        v-bind="getProps(block).props"
      >
        <h2 v-if="block.title && block.props.titleType === 'heading'" class="custom-label">{{ customT(block.title) }}</h2>
        <div v-else-if="block.title" class="el-form-item__label custom-label">{{ customT(block.title) }}</div>

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
        <slot name="after-layouts" />
      </component>
    </template>

    <template v-else-if="block.fields && block.fields.length">
      <component
        :is="getProps(block).component"
        :class="[
          { 'grow-elements': block.props.elementsGrow },
          `generic-form_block-${block.type}`,
          block.props.class,
          block.props.isPaper ? 'el-card is-always-shadow' : '',
        ]"
        :style="isMobile ? block.props.mobileStyles : block.props.styles"
        v-bind="getProps(block).props"
      >
        <h2 v-if="block.title && block.props.titleType === 'heading'" class="custom-label">{{ customT(block.title) }}</h2>
        <div v-else-if="block.title" class="el-form-item__label custom-label">{{ customT(block.title) }}</div>

        <template v-for="field in block.fields" :key="field.name">
          <slot name="item" v-bind="field" />
        </template>
        <slot name="after-fields" />
      </component>
    </template>
  </template>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  shallowRef,
} from 'vue';
import type { GenericFormLayout, FormLayoutColumn, FormLayoutRow } from 'lib/types/form/layout';
import { useTranslate } from 'lib/utils/core/translate';
import { useMobile } from 'lib/utils/core/is-mobile';
import { useLayoutChecks } from 'lib/utils/core/mixed-check';

export default defineComponent({
  name: 'FormLayoutBlock',
  components: {},
  props: {
    block: {
      type: [Object, Array] as PropType<GenericFormLayout<any>>,
      required: true,
    },
  },
  setup (props) {
    const { customT } = useTranslate();
    const isMobile = useMobile();

    const { hidden } = useLayoutChecks(props.block);
    const shallowComponent = shallowRef(props.block.type === 'custom' ? props.block.component?.() : null);

    const getProps = (block: FormLayoutRow<any> | FormLayoutColumn<any>) => {
      if (block.type === 'row') {
        return {
          component: 'el-row',
          props: block.props || {},
        };
      }
      return {
        component: 'el-col',
        props: block.props || {},
      };
    };

    return {
      customT,
      getProps,
      isMobile,
      hidden,
      shallowComponent,
    };
  },
});
</script>
