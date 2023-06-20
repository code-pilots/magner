<template>
  <GenericForm
    v-if="formConfigReceived"
    :initial-data="initialData"
    :config="formConfig"
    :error="error"
    :field-errors="fieldErrors"
    :skip-validation="!isNew ? ['empty'] : []"
    :is-new="isNew"
    :request-data="reqData"
    :skip-actions="isNew || !config.deleteRequest ? ['remove'] : []"
    class="card-form"
    @submit="save"
    @remove="deleteEntity"
  />
</template>

<script lang="ts">
import '../../../assets/styles/components/card-form.css';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import type { CardConfig } from 'lib/types/configs';
import type { ActionAction } from 'lib/types/utils/actions';
import { type TranslateData, useTranslate } from 'lib/utils/core/translate';
import { magnerConfirm, magnerMessage } from 'lib/utils/core/messages';
import GenericForm from './form.vue';

export default defineComponent({
  name: 'CardForm',
  components: { GenericForm },
  props: {
    config: {
      type: Object as PropType<CardConfig<any>>,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    entityId: {
      type: [String, Number, Object],
      default: null,
    },

    /** Object with keys as field names and values as whatever you pass to a form field */
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['success'],
  setup (props, context) {
    const { customT, t } = useTranslate();

    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});
    const reqData = computed(() => ({ id: props.entityId, data: null, isNew: props.isNew }));
    const formConfig: any = ref({});
    const formConfigReceived = ref(false);

    const save = async (data: Record<string, unknown>) => {
      const submitButton = (props.config.form.actions || [])
        .find((action) => (action as ActionAction)?.emits === 'submit');
      if (submitButton) submitButton.loading = true;

      error.value = '';
      fieldErrors.value = {};

      let res;
      if (props.isNew) {
        res = await props.config.createRequest?.({ ...reqData.value, data });
      } else {
        res = await props.config.updateRequest?.({ ...reqData.value, data });
      }
      if (submitButton) submitButton.loading = false;

      if (res.error) {
        if (typeof res.error === 'string') {
          error.value = res.error;
        } else {
          error.value = res.error.message;
          fieldErrors.value = res.error.fields;
        }
        return;
      }

      error.value = '';
      fieldErrors.value = {};

      let message;

      if (props.isNew) {
        message = props.config.successMessage?.create
          ? props.config.successMessage?.create
          : t('core.card.success_creation');
      } else {
        message = props.config.successMessage?.update
          ? props.config.successMessage?.update
          : t('core.card.success_edition');
      }

      magnerMessage({
        type: 'success',
        message,
      });

      context.emit('success', { data: { ...reqData.value, data }, response: res.data });
    };

    const confirmDelete = (): Promise<boolean> => new Promise((resolve) => {
      const confirmMessage = props.config.confirmDelete === true
        ? t('core.card.removal_confirm', { msg: customT(props.config.header.title || '') })
        : customT(props.config.confirmDelete as TranslateData);

      magnerConfirm({
        message: confirmMessage,
        title: t('core.card.attention'),
        confirmButtonText: t('core.card.confirm_button_text'),
        cancelButtonText: t('core.card.cancel_button_text'),
        type: 'warning',
      }).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });

    const deleteEntity = async (action: ActionAction) => {
      if (!props.config.deleteRequest) return;
      if (props.config.confirmDelete && !(await confirmDelete())) return;

      action.loading = true;
      const res = await props.config.deleteRequest(reqData.value);
      action.loading = false;

      if (res.error) {
        if (typeof res.error === 'string') {
          error.value = res.error;
        } else {
          error.value = res.error.message;
        }
        return;
      }

      const message = props.config.successMessage?.delete
        ? props.config.successMessage?.delete
        : t('core.card.success_removal');

      magnerMessage({
        type: 'success',
        message,
      });

      context.emit('success', { data: { ...reqData.value }, response: res.data });
    };

    const receiveFormConfig = async () => {
      if (props.config.getLayoutRequest) {
        const res = await props.config.getLayoutRequest?.({ ...reqData.value });
        formConfig.value = res.data;
        formConfigReceived.value = true;
      } else {
        formConfig.value = props.config.form;
        formConfigReceived.value = true;
      }
    };

    receiveFormConfig();

    return {
      customT,
      t,
      error,
      fieldErrors,
      reqData,
      save,
      deleteEntity,

      formConfig,
      formConfigReceived,
    };
  },
});
</script>
