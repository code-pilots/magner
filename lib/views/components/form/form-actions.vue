<template>
  <div class="generic-form_actions">
    <slot name="actions-before" />

    <template v-for="(action, i) in actions" :key="i">
      <el-button
        v-if="!skipActions || (Array.isArray(skipActions) && !skipActions.includes(action.action))"
        :size="size"
        :loading="action.loading"
        :type="action.type || 'default'"
        :native-type="action.nativeType || 'button'"
        :class="[`generic-form_${action.action}`, action.class || '', 'width-full']"
        @click="act(action)"
      >
        {{ getTranslation(action) }}
      </el-button>
    </template>

    <slot name="actions-after" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { FormAction } from 'lib/types/form/actions';
import { TranslateData, useTranslate } from 'lib/utils/core/translate';

export default defineComponent({
  name: 'FormActions',
  props: {
    actions: {
      type: Array as PropType<FormAction[]>,
      default: () => ([]),
    },
    size: {
      type: String as PropType<'medium' | 'small' | 'mini'>,
      default: 'medium',
    },
    skipActions: {
      type: [Array, Boolean] as PropType<FormAction['action'][] | boolean>,
      default: () => ([]),
    },
  },
  emits: ['action'],
  setup (props, context) {
    const { t, customT } = useTranslate();

    const translations: Record<FormAction['action'], TranslateData> = {
      cancel: t('core.form.cancel'),
      clear: t('core.form.clear'),
      remove: t('core.form.remove'),
      submit: t('core.form.submit'),
    };

    const getTranslation = (action: FormAction): string => (action.text
      ? customT(action.text)
      : translations[action.action]);

    const act = (action: FormAction) => {
      context.emit('action', action);
    };

    return {
      act,
      getTranslation,
    };
  },
});
</script>
