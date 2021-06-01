<template>
  <suspense>
    <template #default>
      <RequestHandler :request="request" :data="data">
        <template #default="{response, error}">
          <template v-if="error">
            {{ error }}
          </template>
          <slot v-else v-bind="response" />
        </template>
      </RequestHandler>
    </template>
    <template #fallback>
      <div v-loading class="loading" />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RequestFunc } from 'settings/types/utils';
import RequestHandler from 'settings/views/components/request-handler.vue';

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
