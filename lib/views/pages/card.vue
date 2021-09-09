<template>
  <Dynamic :request="config.getRequest" :data="cardId" :disabled="isNew">
    <template #default="{response, loading}">
      <section v-loading="loading" class="card-page" :class="pageName">
        <div v-if="config.title || config.tabs" class="card-page_header">
          <h1 class="card-page_header_title">
            {{ customT(config.title) }}
          </h1>
          <el-tabs v-if="config.tabs" type="card">
            <el-tab-pane
              v-for="(tab, i) in config.tabs"
              :key="i"
              :name="i.toString()"
            >
              <template #label>
                <router-link v-if="!tab.active" :to="typeof tab.link === 'function' ? tab.link(response) : tab.link">
                  {{ customT(tab.label) }}
                </router-link>
                <span v-else>{{ customT(tab.label) }}</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>

        <GenericForm
          :initial-data="response"
          :config="config.form"
          :error="error"
          :field-errors="fieldErrors"
          :skip-validation="!isNew ? ['empty'] : []"
          :return-initial-difference="!isNew"
          :skip-actions="[isNew || !config.deleteRequest ? ['remove'] : []]"
          class="card-page_form"
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
      </section>
    </template>
  </Dynamic>
</template>

<script lang="ts">
import '../../assets/styles/pages/card.css';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { useTranslate } from '../../utils/core/translate';
import { requestWrapper } from '../../utils/core/request';
import { magnerConfirm, magnerMessage } from '../../utils/core/messages';
import type { CardConfig } from '../../types/configs';
import type { FormAction } from '../../types/form/actions';
import Dynamic from '../components/dynamic.vue';
import GenericForm from '../components/form/form.vue';
import DialogForm from '../components/form/dialog-form.vue';

export default defineComponent({
  name: 'CardPage',
  components: { DialogForm, Dynamic, GenericForm },
  props: {
    config: {
      type: Object as PropType<CardConfig>,
      required: true,
    },
  },
  setup (props) {
    const { customT, t } = useTranslate();
    const route = useRoute();
    const cardId = computed(() => route.params.id);
    const isNew = computed<boolean>(() => cardId.value === 'new' || !!props.config.alwaysCreate);

    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});

    const save = async (data: Record<string, any>) => {
      const submitButton = (props.config.form.actions || []).find((action) => action.action === 'submit');
      if (submitButton) submitButton.loading = true;
      error.value = '';
      fieldErrors.value = {};

      const res = await requestWrapper(data, props.config.createRequest);
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
      const res = await requestWrapper(cardId.value, props.config.deleteRequest);
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
      cardId,
      isNew,
      error,
      fieldErrors,
      pageName: `page-${route.name as string}`,
      save,
      deleteEntity,
    };
  },
});
</script>
