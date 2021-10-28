<template>
  <i
    :class="[
      (core || name) ? 'icon-' + core || name : '',
      'size-' + size,
      'rotate-' + rotate,
    ]"
    class="icon"
  >
    <suspense>
      <template #default>
        <SvgImporter :icon="icon" :core="core" />
      </template>
      <template #fallback>
        <svg />
      </template>
    </suspense>
  </i>
</template>

<script lang="ts">
import 'lib/assets/styles/components/icons.css';
import { defineComponent, PropType } from 'vue';
import type { IconImport } from 'lib/types/utils/useful';
import SvgImporter from './svg-importer.vue';

export default defineComponent({
  name: 'SvgIcon',
  components: {
    SvgImporter,
  },
  props: {
    icon: {
      type: Function as unknown as PropType<IconImport>,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md',
    },
    rotate: {
      type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
      default: 'top',
    },
    core: {
      type: String,
      default: null,
    },
  },
});
</script>
