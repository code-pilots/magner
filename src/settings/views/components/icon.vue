<template>
  <span :class="size" class="icon">
    <suspense>
      <template #default>
        <SvgImporter :name="name" />
      </template>
      <template #fallback>
        <svg />
      </template>
    </suspense>
  </span>
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
  },
});
</script>
