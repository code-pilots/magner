<template>
  <suspense>
    <template #default>
      <RequestHandler
        ref="reqHandler"
        :request="request"
        :data="data"
        :disabled="disabled"
        @error="emitError"
      >
        <template #default="{response, error, loading}">
          <template v-if="error">
            <slot name="error" :error="error">
              <error-page />
            </slot>
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
import { useTranslate } from 'lib/utils/core/translate';
import ErrorPage from 'lib/views/pages/404.vue';
import RequestHandler from './request-handler.vue';

export default defineComponent({
  name: 'Dynamic',
  components: { ErrorPage, RequestHandler },
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
  emits: ['error'],
  setup (_, context) {
    const reqHandler = ref<typeof RequestHandler>();
    const { customT, t } = useTranslate();

    const makeRequest = () => {
      reqHandler.value!.makeRequest?.();
    };

    const emitError = (err: string) => {
      context.emit('error', err);
    };

    return {
      reqHandler,
      makeRequest,
      emitError,
      customT,
      t,
    };
  },
});
</script>
