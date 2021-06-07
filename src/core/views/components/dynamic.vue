<template>
  <suspense>
    <template #default>
      <RequestHandler :request="request" :data="data">
        <template #default="{response, error, loading}">
          <template v-if="error">
            {{ error }}
          </template>
          <slot v-else v-bind="{response, loading}" />
        </template>
      </RequestHandler>
    </template>
    <template #fallback>
      <div v-loading="true" class="loading" />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RequestFunc } from '../../types/utils';
import RequestHandler from './request-handler.vue';

export default defineComponent({
  name: 'Dynamic',
  components: { RequestHandler },
  props: {
    request: {
      type: Function as PropType<RequestFunc>,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>
