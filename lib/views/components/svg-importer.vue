<template>
  <component :is="node" v-if="node" />
</template>

<script lang="ts">
import {
  Component, defineComponent, markRaw, PropType,
} from 'vue';
import type { IconImport } from '../../types/utils/useful';

export default defineComponent({
  name: 'SvgImporter',
  props: {
    icon: {
      type: [Function] as PropType<IconImport>,
      default: null,
    },
    core: {
      type: String,
      default: null,
    },
  },
  async setup (props) {
    let node: Component;

    try {
      const component = props.core
        ? await (() => import(`../../assets/icons/${props.core}.svg`))()
        : await props.icon?.() || null;
      node = component?.default || component;
    } catch (e) {
      throw new Error('Couldn\'t load the icon!');
    }

    return {
      node: markRaw(node || null),
    };
  },
});
</script>
