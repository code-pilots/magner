<template>
  <section class="table-page">
    <div v-if="hasFilters" class="table-page_top">
      <GenericForm
        ref="formRef"
        :config="{ ...config.filters, layout: topFilters }"
        :loading="false"
        :initial-data="requestData.filters"
        class="table-page_top_filters"
        @submit="filterItems"
      >
        <template #after>
          <el-button type="primary" icon="el-icon-s-operation" @click="drawerOpen = true">
            {{ t('core.table.more_filters') }}
          </el-button>
          <el-tag v-if="appliedFilters" closable @close="clearFilters">
            {{ t('core.table.filters_applied') }}: {{ appliedFilters }}
          </el-tag>
          <div class="flex-grow" />
        </template>
      </GenericForm>

      <component
        :is="drawerComponent.component"
        v-model="drawerOpen"
        v-bind="drawerComponent.props"
      >
        <GenericForm
          :config="{
            ...config.filters,
            submitEvent: 'submit',
            size: isMobile ? 'medium' : 'small',
            clearable: true,
          }"
          :initial-data="requestData.filters"
          :loading="false"
          @submit="filterItems"
        >
          <template #after>
            <div class="flex-grow" />
          </template>
        </GenericForm>
      </component>

      <router-link
        v-if="config.filters.linkToCreateNew"
        :to="{name: config.filters.linkToCreateNew.routeName, params: { id: 'new' }}"
        class="table-page_top_create"
      >
        <el-button native-type="button" type="primary">
          {{ customT(config.filters.linkToCreateNew.label) }}
        </el-button>
      </router-link>
    </div>

    <Dynamic :request="config.request" :data="requestData">
      <template #default="{response, loading}">
        <div v-loading="loading" class="table-page_table">
          <DataTable
            :data="response.rows"
            :config="config.table"
            :table-height="tableHeight"
            @sort="changeSort"
          />
        </div>

        <div
          v-if="(response && response.pagination) && (requestData && requestData.pagination)"
          class="table-page_pagination flex-center"
        >
          <el-pagination
            v-model:currentPage="response.pagination.currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="parseInt(requestData.pagination.items) || 10"
            :total="response.pagination.totalItems"
            :pager-count="7"
            :small="isMobile"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="requestData.pagination.page = $event"
            @size-change="requestData.pagination.items = $event"
          />
        </div>
      </template>
    </Dynamic>
  </section>
</template>

<script lang="ts">
import 'styles/pages/table.css';
import {
  computed,
  defineComponent, PropType, reactive, ref, watch, watchEffect,
} from 'vue';
import type { TableConfig } from 'core/types/configs';
import { useMobile, useTranslate } from 'core/utils';
import { useRoute, useRouter } from 'vue-router';
import useDialogForm from 'core/utils/form/use-dialog-form';
import useStore from 'core/controllers/store/store';
import { layoutToFields } from 'core/utils/form/form';
import filterUrlDataComparison from 'core/utils/form/filter-url-data-comparison';
import lstorage from 'core/utils/core/local-storage';
import DataTable from 'core/views/components/table.vue';
import Dynamic from '../components/dynamic.vue';
import GenericForm from '../components/form/form.vue';

export default defineComponent({
  name: 'TablePage',
  components: {
    DataTable,
    GenericForm,
    Dynamic,
  },
  props: {
    config: {
      type: Object as PropType<TableConfig>,
      required: true,
    },
  },
  setup (props) {
    const { t, customT } = useTranslate();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isMobile = useMobile();
    const drawerComponent = useDialogForm();

    const topFilters = computed(() => layoutToFields(props.config.filters.layout)
      .slice(0, props.config.filters.fieldsShowAmount || undefined));

    const drawerOpen = ref(false);
    const formRef = ref<GenericForm>();

    const hasFilters = computed(() => !!(topFilters.value.length || props.config.filters.linkToCreateNew));
    const tableHeight = computed(() => {
      const headerHeight = 50;
      const topHeight = hasFilters.value ? 64 : 0;
      const bottomHeight = 40;

      let height;
      if (isMobile.value) height = headerHeight + bottomHeight;
      else height = headerHeight + topHeight + bottomHeight;

      return `calc(100vh - ${height + 1}px)`;
    });

    const requestData = reactive({
      pagination: { ...(props.config.filters.pagination || {}) },
      filters: { ...(props.config.filters.filtersData || {}) },
      sort: { ...(props.config.filters.sort || {}) },
    });

    // Depending on URL query existence and configuration, load initial data from URL or LocalStorage
    const initialData = props.config.filters.saveToLocalStorage && !Object.keys(route.query).length
      ? lstorage.deepRead('filters', route.name as string)
      : store.state.project.development.urlParsers.urlToData(route.query);
    filterUrlDataComparison(requestData, initialData);

    const appliedFilters = computed(() => Object.values(requestData.filters).filter((filter) => !!filter).length);
    const clearFilters = () => formRef.value.clearForm?.();

    const filterItems = (form: Record<string, string>) => {
      requestData.filters = { ...form };
      requestData.pagination = { ...(props.config.filters.pagination || {}) };
      drawerOpen.value = false;
    };

    const changeSort = (sort: { column: any|null, prop: string|null, order: 'ascending'|'descending'|null }) => {
      requestData.pagination = { ...(props.config.filters.pagination || {}) };
      if (!sort.prop) {
        requestData.sort = { ...(props.config.filters.sort || {}) };
        return;
      }

      requestData.sort = {
        [sort.prop]: sort.order === 'ascending' ? 'ASC' : 'DESC',
      };
    };

    watch(() => requestData, (val) => {
      const query = store.state.project.development.urlParsers.dataToUrl(val);
      router.push(route.path + query);
    }, { deep: true });

    watchEffect(() => {
      if (props.config.filters.saveToLocalStorage) {
        lstorage.deepPut('filters', route.name as string, { filters: requestData.filters });
      }
    });

    return {
      t,
      customT,
      requestData,
      drawerOpen,
      isMobile,
      drawerComponent,
      appliedFilters,
      formRef,
      hasFilters,
      tableHeight,
      topFilters,
      filterItems,
      changeSort,
      clearFilters,
    };
  },
});
</script>
