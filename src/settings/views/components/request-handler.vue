<template>
  <slot v-bind="response" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RequestFunc } from 'settings/types/utils';
import useStore from 'settings/controllers/store';
import { useRouter } from 'vue-router';

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

    const response = await props.request({
      data: props.data,
      store,
      router,
    });

    return {
      response,
    };
  },
});
</script>
