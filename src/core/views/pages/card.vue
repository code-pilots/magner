<template>
  <Dynamic :request="config.getRequest" :data="cardId" :disabled="isNew">
    <template #default="{response, loading}">
      <section v-loading="loading" class="card-page">
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
          :loading="createLoading"
          :error="error"
          :field-errors="fieldErrors"
          :skip-validation="!isNew ? ['empty'] : false"
          :return-initial-difference="!isNew"
          class="card-page_form"
          @submit="save"
        >
          <template #actions-before>
            <el-button
              v-if="!isNew && !!config.deleteRequest"
              type="danger"
              :loading="deleteLoading"
              @click="deleteEntity"
            >
              {{ t('core.card.remove') }}
            </el-button>
          </template>

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
import 'styles/pages/card.css';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import { useTranslate } from 'core/utils/translate';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { CardConfig } from 'core/types/configs';
import { requestWrapper } from 'core/utils/request';
import Dynamic from 'core/views/components/dynamic.vue';
import GenericForm from 'core/views/components/form/form.vue';
import DialogForm from 'core/views/components/form/dialog-form.vue';

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
    const isNew = computed<boolean>(() => cardId.value === 'new');

    const createLoading = ref<boolean>(false);
    const deleteLoading = ref<boolean>(false);
    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});

    const save = async (data: Record<string, any>) => {
      createLoading.value = true;
      error.value = '';
      fieldErrors.value = {};

      const res = await requestWrapper(data, props.config.createRequest);
      createLoading.value = false;

      if (res.error) {
        if (typeof res.error === 'string') {
          error.value = res.error;
        } else {
          error.value = res.error.message;
          fieldErrors.value = res.error.fields;
        }
        return;
      }

      ElMessage({
        type: 'success',
        message: t('core.card.success_creation'),
      });
    };

    const confirmDelete = (): Promise<boolean> => new Promise((resolve) => {
      ElMessageBox.confirm(t('core.card.removal_confirm', { msg: props.config.title }), t('core.card.attention'), {
        confirmButtonText: t('core.card.confirm_button_text'),
        cancelButtonText: t('core.card.cancel_button_text'),
        type: 'warning',
      }).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });

    const deleteEntity = async () => {
      if (!props.config.deleteRequest) return;
      if (props.config.confirmDelete && !(await confirmDelete())) return;

      deleteLoading.value = true;
      const res = await requestWrapper(cardId.value, props.config.deleteRequest);

      if (res.error) {
        if (typeof res.error === 'string') {
          error.value = res.error;
        } else {
          error.value = res.error.message;
        }
      }

      deleteLoading.value = false;
      ElMessage({
        type: 'success',
        message: t('core.card.success_removal'),
      });
    };

    return {
      customT,
      t,
      cardId,
      isNew,
      createLoading,
      deleteLoading,
      error,
      fieldErrors,
      save,
      deleteEntity,
    };
  },
});
</script>
