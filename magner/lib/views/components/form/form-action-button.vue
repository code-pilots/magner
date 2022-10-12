<template>
  <template v-if="!hidden">
    <router-link
      v-if="action.type === 'link'"
      :to="getLink(action.to)"
      class="generic-form_actions_link"
    >
      <el-button
        :size="size"
        :loading="action.loading"
        :type="action.props.type || 'default'"
        :native-type="action.props.nativeType || 'button'"
        :class="[action.props.class || '', 'width-full']"
        :plain="action.props.plain"
        :icon="action.props.icon"
      >
        {{ getTranslation(action) }}
      </el-button>
    </router-link>

    <el-button
      v-else-if="!skipActions || (Array.isArray(skipActions) && !skipActions.includes(action.emits))"
      :size="size"
      :loading="action.loading"
      :type="action.props.type || 'default'"
      :native-type="action.props.nativeType || 'button'"
      :plain="action.props.plain"
      :icon="action.props.icon"
      :class="['generic-form_actions_action', action.props.class || '', 'width-full']"
      @click="act(action)"
    >
      {{ getTranslation(action) }}
    </el-button>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import type { ActionButton, ActionAction, ActionLink } from 'lib/types/utils/actions';
import {
  actionWrapper,
  magnerMessage,
  useActionButtonChecks,
  TranslateData,
  useTranslate,
} from 'lib/utils';

export default defineComponent({
  name: 'FormActionButton',
  props: {
    action: {
      type: Object as PropType<ActionButton<string, any>>,
      required: true,
    },
    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default',
    },
    skipActions: {
      type: [Array, Boolean] as PropType<string[] | boolean>,
      default: () => ([]),
    },
    requestData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['action'],
  setup (props, context) {
    const { t, customT } = useTranslate();
    const route = useRoute();

    const { hidden } = useActionButtonChecks(props.action);

    const translations: Record<string, TranslateData> = {
      cancel: t('core.form.cancel'),
      clear: t('core.form.clear'),
      remove: t('core.form.remove'),
      submit: t('core.form.submit'),
    };

    const getTranslation = (action: ActionButton<string, any>): TranslateData => (
      action.type === 'action' && !action.props.text
        ? translations[action.emits as keyof typeof translations]
        : customT(action.props.text || '')
    );

    const getLink = (to: ActionLink<any>['to']): RouteLocationRaw => {
      if (typeof to === 'function') {
        return to(route);
      }
      return to;
    };

    const act = async (action: ActionAction) => {
      if (action.action) {
        const res = await actionWrapper(props.requestData, action.action);
        if (res || res === '') {
          magnerMessage({
            type: 'error',
            message: typeof res !== 'boolean' ? customT(res) : t('core.form.failed_action'),
          });
          return;
        }
      }

      context.emit('action', action);
    };

    return {
      act,
      getTranslation,
      getLink,
      hidden,
    };
  },
});
</script>
