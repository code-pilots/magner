<template>
  <slot v-bind="{ error, response, loading }" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { RequestCallback } from 'core/types/utils';
import { requestWrapper } from 'core/utils/request';

export default defineComponent({
  name: 'RequestHandler',
  props: {
    request: {
      type: Function as PropType<RequestCallback>,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['loading'],
  async setup (props, context) {
    const error = ref('');
    const response = ref();
    const loading = ref(false);

    let initialLoaded = false; // Variable prevents sending two request simultaneously on initial load

    const changeLoading = (val: boolean) => {
      loading.value = val;
      context.emit('loading', val);
    };

    const request = async (newData?: any) => {
      changeLoading(true);

      const res = await requestWrapper(newData || props.data, props.request);

      changeLoading(false);
      initialLoaded = true;

      response.value = res.data;

      if (res.error) {
        error.value = res.error;
      }
    };

    watchEffect(() => {
      if (initialLoaded) {
        request(props.data);
      }
    });

    await request();

    return {
      response,
      error,
      loading,
    };
  },
});
</script>
