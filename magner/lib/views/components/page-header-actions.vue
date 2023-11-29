<template>
  <div class="generic-form_actions">
    <template v-for="(action, i) in actions" :key="i">
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

      <template v-else>
        <el-button
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw, useRoute } from 'vue-router';
import { TranslateData, useTranslate } from 'lib/utils/core/translate';
import type { ActionButton, ActionLink } from 'lib/types/utils/actions';
import { magnerMessage } from 'lib/utils';

export default defineComponent({
  name: 'PageHeaderActions',
  props: {
    actions: {
      type: Array as PropType<ActionButton<string, any>[]>,
      default: () => ([]),
    },
    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default',
    },
  },
  emits: ['action'],
  setup (props, context) {
    const { t, customT } = useTranslate();
    const route = useRoute();

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

    const act = async (action: {action: Function}) => {
      if (action.action && typeof action.action === 'function') {
        const res = await action.action();
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
      getTranslation,
      getLink,

      act,
    };
  },
});
</script>
