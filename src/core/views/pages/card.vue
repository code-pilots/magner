<template>
  <Dynamic :request="config.getRequest" :data="cardId" :disabled="isNew">
    <template #default="{response, loading}">
      <section v-loading="loading" class="card-page">
        <GenericForm
          :initial-data="response"
          :config="config.form"
          :loading="createLoading"
          :error="error"
          :field-errors="fieldErrors"
          :allow-empty-fields="!isNew"
          :return-initial-difference="!isNew"
          class="card-page_form"
          @submit="save"
        >
          <template #before>
            <h1 class="card-page_form_title">
              {{ config.title }}
            </h1>
          </template>

          <template #actions-before>
            <el-button
              v-if="!isNew && !!config.deleteRequest"
              type="danger"
              :loading="deleteLoading"
              @click="deleteEntity"
            >
              Удалить
            </el-button>
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
import { ElMessageBox, ElMessage } from 'element-plus';
import type { CardConfig } from 'core/types/configs';
import { requestWrapper } from 'core/utils/request';
import Dynamic from 'core/views/components/dynamic.vue';
import GenericForm from '../components/form/form.vue';

export default defineComponent({
  name: 'CardPage',
  components: { Dynamic, GenericForm },
  props: {
    config: {
      type: Object as PropType<CardConfig>,
      required: true,
    },
  },
  setup (props) {
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
        message: 'Успешно создано!',
      });
    };

    const confirmDelete = (): Promise<boolean> => new Promise((resolve) => {
      ElMessageBox.confirm(`Вы уверены, что хотите удалить сущность "${props.config.title}"`, 'Внимание!', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }).then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });

    const deleteEntity = async () => {
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
        message: 'Удаление прошло успешно!',
      });
    };

    return {
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
