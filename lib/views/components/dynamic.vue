<template>
  <suspense>
    <template #default>
      <RequestHandler
        ref="reqHandler"
        :request="request"
        :data="data"
        :disabled="disabled"
      >
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
import { defineComponent, PropType, ref } from 'vue';
import { RequestCallback } from 'lib/types/utils/api';
import RequestHandler from './request-handler.vue';

export default defineComponent({
  name: 'Dynamic',
  components: { RequestHandler },
  props: {
    request: {
      type: Function as PropType<RequestCallback>,
      required: true,
    },
    data: {
      type: [Object, Number, String],
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    const reqHandler = ref<typeof RequestHandler>();

    const makeRequest = () => {
      reqHandler.value!.makeRequest?.();
    };

    return {
      reqHandler,
      makeRequest,
    };
  },
});
</script>
