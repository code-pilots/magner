<template>
  <i
    :class="[
      'icon-' + name,
      'size-' + size,
      'rotate-' + rotate,
    ]"
    class="icon"
  >
    <suspense>
      <template #default>
        <SvgImporter :name="name" :is-core="isCore" />
      </template>
      <template #fallback>
        <svg />
      </template>
    </suspense>
  </i>
</template>

<script lang="ts">
import 'styles/components/icons.css';
import { defineComponent, PropType } from 'vue';
import SvgImporter from './svg-importer.vue';

export default defineComponent({
  name: 'SvgIcon',
  components: {
    SvgImporter,
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md',
    },
    rotate: {
      type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
      default: 'top',
    },
    isCore: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
