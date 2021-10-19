<template>
  <GenericForm
    :initial-data="initialData"
    :config="config.form"
    :error="error"
    :field-errors="fieldErrors"
    :skip-validation="!isNew ? ['empty'] : []"
    :return-initial-difference="!isNew"
    :skip-actions="[isNew || !config.deleteRequest ? ['remove'] : []]"
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
import 'lib/assets/styles/components/card-form.css';
import {
  defineComponent, PropType, ref,
} from 'vue';
import type { CardConfig } from 'lib/types/configs';
import type { FormAction } from 'lib/types/form/actions';
import { useTranslate } from 'lib/utils/core/translate';
import { requestWrapper } from 'lib/utils/core/request';
import { magnerConfirm, magnerMessage } from 'lib/utils/core/messages';
import GenericForm from './form.vue';
import DialogForm from './dialog-form.vue';

export default defineComponent({
  name: 'CardForm',
  components: { DialogForm, GenericForm },
  props: {
    config: {
      type: Object as PropType<CardConfig>,
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
  setup (props) {
    const { customT, t } = useTranslate();

    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});

    const save = async (data: Record<string, any>) => {
      const submitButton = (props.config.form.actions || []).find((action) => action.action === 'submit');
      if (submitButton) submitButton.loading = true;
      error.value = '';
      fieldErrors.value = {};

      const reqData = { id: props.entityId, data };
      const res = await requestWrapper(reqData, props.isNew ? props.config.createRequest : props.config.updateRequest);
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

      magnerMessage({
        type: 'success',
        message: t('core.card.success_creation'),
      });
    };

    const confirmDelete = (): Promise<boolean> => new Promise((resolve) => {
      magnerConfirm({
        message: t('core.card.removal_confirm', { msg: customT(props.config.title) }),
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

    const deleteEntity = async (action: FormAction) => {
      if (!props.config.deleteRequest) return;
      if (props.config.confirmDelete && !(await confirmDelete())) return;

      action.loading = true;
      const reqData = { id: props.entityId, data: null };
      const res = await requestWrapper(reqData, props.config.deleteRequest);
      action.loading = false;

      if (res.error) {
        if (typeof res.error === 'string') {
          error.value = res.error;
        } else {
          error.value = res.error.message;
        }
      }

      magnerMessage({
        type: 'success',
        message: t('core.card.success_removal'),
      });
    };

    return {
      customT,
      t,
      error,
      fieldErrors,
      save,
      deleteEntity,
    };
  },
});
</script>
