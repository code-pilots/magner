<template>
  <component :is="icon" v-if="icon" />
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';

export default defineComponent({
  name: 'SvgImporter',
  props: {
    name: {
      type: String,
      default: null,
    },
    isCore: {
      type: Boolean,
      default: false,
    },
  },
  async setup (props) {
    const icon = shallowRef(null);

    try {
      const component = props.isCore
        ? await (() => import(`../../assets/icons/${props.name}.svg`))()
        : await (() => import(`../../../assets/icons/${props.name}.svg`))();
      icon.value = component.default;
    } catch (e) {
      throw new Error(`Couldn't find the SVG file with name "${props.name}" in directory "icons"`);
    }

    return {
      icon,
    };
  },
});
</script>
