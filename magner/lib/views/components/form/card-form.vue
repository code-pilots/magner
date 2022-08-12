<template>
  <GenericForm
    :initial-data="initialData"
    :config="config.form"
    :error="error"
    :field-errors="fieldErrors"
    :skip-validation="!isNew ? ['empty'] : []"
    :is-new="isNew"
    :request-data="reqData"
    :skip-actions="isNew || !config.deleteRequest ? ['remove'] : []"
    class="card-form"
    @submit="save"
    @remove="deleteEntity"
  >
    <template v-if="config.form.dialogForms && config.form.dialogForms.length" #dialogs="formData">
      <DialogForm
        v-for="dialogForm in config.form.dialogForms"
        :key="dialogForm.name"
        :config="dialogForm"
        :form-data="formData"
      />
    </template>
  </GenericForm>
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
import DialogForm from './dialog-form.vue';

export default defineComponent({
  name: 'CardForm',
  components: { DialogForm, GenericForm },
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

        // if (!res.error) {
        //   const getRes = await props.config.getRequest({
        //     data: null,
        //     id: res.data.id,
        //     isNew: false,
        //   });
        // }
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

      magnerMessage({
        type: 'success',
        message: props.isNew ? t('core.card.success_creation') : t('core.card.success_edition'),
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

      magnerMessage({
        type: 'success',
        message: t('core.card.success_removal'),
      });
      context.emit('success', { data: { ...reqData.value }, response: res.data });
    };

    return {
      customT,
      t,
      error,
      fieldErrors,
      reqData,
      save,
      deleteEntity,
    };
  },
});
</script>
