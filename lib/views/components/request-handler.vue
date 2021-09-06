<template>
  <slot v-bind="{ error, response, loading }" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import type { RequestCallback } from '../../types/utils/api';
import { requestWrapper } from '../../utils';

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
  emits: ['loading'],
  async setup (props, context) {
    const error = ref('');
    const response = ref();
    const loading = ref(false);
    const initialLoaded = ref(false); // Variable prevents sending two request simultaneously on initial load

    const changeLoading = (val: boolean) => {
      loading.value = val;
      context.emit('loading', val);
    };

    const request = async (newData?: any) => {
      if (props.disabled) return;

      changeLoading(true);
      const res = await requestWrapper(newData || props.data, props.request);
      changeLoading(false);

      initialLoaded.value = true;
      response.value = res.data;

      if (res.error) {
        error.value = res.error;
      }
    };

    watch(() => props.data, (val) => {
      request(val);
    }, { deep: true });

    await request();

    return {
      response,
      error,
      loading,
    };
  },
});
</script>
