<template>
  <slot v-bind="{ error, response, loading }" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import type { RequestCallback } from 'lib/types/utils/api';

export default defineComponent({
  name: 'RequestHandler',
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
  emits: ['loading', 'error'],
  async setup (props, context) {
    const error = ref('');
    const response = ref();
    const loading = ref(false);
    const initialLoaded = ref(false); // Variable prevents sending two index simultaneously on initial load

    const changeLoading = (val: boolean) => {
      loading.value = val;
      context.emit('loading', val);
    };

    const makeRequest = async (newData?: any) => {
      if (props.disabled) return;

      changeLoading(true);
      const res = await props.request(newData || props.data);
      changeLoading(false);

      initialLoaded.value = true;
      response.value = res.data;

      if (res.error) {
        error.value = res.error as string;
        context.emit('error', res.error);
      }
    };

    watch(() => props.data, (val) => {
      makeRequest(val);
    }, { deep: true });

    await makeRequest();

    return {
      response,
      error,
      loading,
      makeRequest,
    };
  },
});
</script>
