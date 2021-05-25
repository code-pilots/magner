<template>
  <el-row
    class="table-page flex-center"
    tag="section"
  >
    <h1>Table page</h1>
  </el-row>
</template>

<script lang="ts">
import 'styles/pages/table.css';
import {
  defineComponent,
  PropType,
} from 'vue';
import type { GlobalRouting, LoginConfig } from 'settings/types/configs';

export default defineComponent({
  name: 'TablePage',
  props: {
    config: {
      type: Object as PropType<LoginConfig>,
      required: true,
    },
    globalRoutes: {
      type: Object as PropType<GlobalRouting>,
      required: true,
    },
  },
  setup () {},
});
</script>
