<template>
  <slot v-bind="{ error, response }" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import { useRouter } from 'vue-router';
import { RequestFunc } from 'settings/types/utils';
import useStore from 'settings/controllers/store';

export default defineComponent({
  name: 'RequestHandler',
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
  async setup (props) {
    const store = useStore();
    const router = useRouter();

    const error = ref('');
    const response = ref();

    const request = async (newData?: any) => {
      const res = await props.request({
        data: newData || props.data,
        store,
        router,
      });

      response.value = res.data;

      if (res.error) {
        error.value = res.error;
      }
    };

    watchEffect(() => {
      request(props.data);
    });

    await request();

    return {
      response,
      error,
    };
  },
});
</script>
