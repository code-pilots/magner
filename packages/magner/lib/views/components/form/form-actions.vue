<template>
  <div class="generic-form_actions">
    <slot name="actions-before" />

    <template v-for="(action, i) in actions" :key="i">
      <router-link
        v-if="action.type === 'link'"
        :to="action.to"
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

      <template v-else-if="!skipActions || (Array.isArray(skipActions) && !skipActions.includes(action.emits))">
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

    <slot name="actions-after" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TranslateData, useTranslate } from 'lib/utils/core/translate';
import type { ActionButton, ActionAction } from 'lib/types/utils/actions';
import { actionWrapper, magnerMessage } from 'lib/utils';

export default defineComponent({
  name: 'FormActions',
  props: {
    actions: {
      type: Array as PropType<ActionButton<string>[]>,
      default: () => ([]),
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

    const translations: Record<string, TranslateData> = {
      cancel: t('core.form.cancel'),
      clear: t('core.form.clear'),
      remove: t('core.form.remove'),
      submit: t('core.form.submit'),
    };

    const getTranslation = (action: ActionButton<string>): TranslateData => (
      action.type === 'action' && !action.props.text
        ? translations[action.emits as keyof typeof translations]
        : customT(action.props.text || '')
    );

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
    };
  },
});
</script>
