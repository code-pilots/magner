<template>
  <div>{{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      default: null,
    },
  },
  setup () {

  },
});
</script>
