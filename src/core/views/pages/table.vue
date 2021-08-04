<template>
  <section class="table-page">
    <div v-if="hasFilters" class="table-page_top">
      <GenericForm
        ref="formRef"
        :config="config.filters"
        :loading="false"
        :filters-show-amount="config.filters.fieldsShowAmount"
        :initial-data="requestData.filters"
        class="table-page_top_filters"
        @submit="filterItems"
      >
        <template #after>
          <template v-if="config.filters.fieldsShowAmount < config.filters.fields.length">
            <el-button type="primary" icon="el-icon-s-operation" @click="drawerOpen = true">Больше фильтров</el-button>
            <el-tag v-if="appliedFilters" closable @close="clearFilters">
              Применено фильтров: {{ appliedFilters }}
            </el-tag>
          </template>
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
        <el-button native-type="button" type="primary">{{ config.filters.linkToCreateNew.label }}</el-button>
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
          v-if="response.pagination && requestData.pagination"
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
import { useRoute, useRouter } from 'vue-router';
import lstorage from 'core/utils/local-storage';
import type { TableConfig } from 'core/types/configs';
import DataTable from 'core/views/components/table.vue';
import useMobile from 'core/utils/is-mobile';
import useStore from 'core/controllers/store/store';
import filterUrlDataComparison from 'core/utils/filter-url-data-comparison';
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
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isMobile = useMobile();

    const drawerOpen = ref(false);
    const formRef = ref<GenericForm>();

    const hasFilters = computed(() => props.config.filters.fields.length || props.config.filters.linkToCreateNew);
    const tableHeight = computed(() => {
      const headerHeight = 50;
      const topHeight = hasFilters.value ? 64 : 0;
      const bottomHeight = 40;

      let height;
      if (isMobile.value) height = headerHeight + bottomHeight;
      else height = headerHeight + topHeight + bottomHeight;

      return `calc(100vh - ${height + 1}px)`;
    });

    const drawerComponent = computed(() => (isMobile.value ? {
      component: 'el-drawer',
      props: {
        direction: 'btt',
        size: 'auto',
        withHeader: false,
        customClass: 'table-page_drawer',
      },
    } : {
      component: 'el-dialog',
      props: {
        title: 'Фильтры',
        width: '70%',
        top: '114px',
        customClass: 'table-page_dialog',
      },
    }));

    const requestData = reactive({
      pagination: { ...(props.config.filters.pagination || {}) },
      filters: { ...(props.config.filters.filtersData || {}) },
      sort: { ...(props.config.filters.sort || {}) },
    });

    // Depending on URL query existence and configuration, load initial data from URL or LocalStorage
    const initialData = props.config.filters.saveToLocalStorage && !Object.keys(route.query).length
      ? lstorage.deepRead('filters', route.name)
      : store.state.project.helpers.urlToData(route.query);
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
      const query = store.state.project.helpers.dataToUrl(val);
      router.push(route.path + query);
    }, { deep: true });

    watchEffect(() => {
      if (props.config.filters.saveToLocalStorage) {
        lstorage.deepPut('filters', route.name, { filters: requestData.filters });
      }
    });

    return {
      requestData,
      drawerOpen,
      isMobile,
      drawerComponent,
      appliedFilters,
      formRef,
      hasFilters,
      tableHeight,
      filterItems,
      changeSort,
      clearFilters,
    };
  },
});
</script>
