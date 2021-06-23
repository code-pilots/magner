<template>
  <section class="table-page">
    <div class="table-page_top">
      <GenericForm
        :config="config.filters"
        :loading="false"
        :filters-show-amount="config.filters.filtersShowAmount"
        class="table-page_top_filters"
        @submit="filterItems"
      >
        <template #after>
          <template v-if="config.filters.filtersShowAmount < config.filters.fields.length">
            <el-button type="primary" icon="el-icon-s-operation" @click="drawerOpen = true">Больше фильтров</el-button>
          </template>
          <div class="flex-grow" />
        </template>
      </GenericForm>

      <el-drawer
        v-model="drawerOpen"
        :direction="isMobile ? 'btt' : 'rtl'"
        :size="isMobile ? '70%' : '30%'"
        :with-header="false"
        :before-close="drawerClose"
        custom-class="table-page_drawer"
      >
        <GenericForm
          :config="{
            ...config.filters,
            submitEvent: 'submit',
          }"
          :loading="false"
          @submit="filterItems"
        >
          <template #after>
            <div class="flex-grow" />
          </template>
        </GenericForm>
      </el-drawer>

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
            :data="response[config.dataField]"
            :config="config.table"
            :table-height="isMobile ? 'calc(100vh - 90px)' : (response.pagination && requestData.pagination)
              ? 'calc(100vh - 155px)'
              : 'calc(100vh - 115px)'"
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
            :page-size="requestData.pagination.items || 10"
            :total="response.total"
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
  defineComponent, PropType, reactive, ref,
} from 'vue';
import type { TableConfig } from 'core/types/configs';
import DataTable from 'core/views/components/table.vue';
import useMobile from 'core/utils/is-mobile';
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
    const name = ref('');
    const check = ref(false);
    const drawerOpen = ref(false);

    const isMobile = useMobile();

    const requestData = reactive({
      pagination: { ...(props.config.filters.pagination || {}) },
      filters: { ...(props.config.filters.filtersData || {}) },
      sort: { ...(props.config.filters.sort || {}) },
    });

    const filterItems = (form: Record<string, string>) => {
      requestData.filters = { ...form };
      requestData.pagination = { ...(props.config.filters.pagination || {}) };
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

    const drawerClose = (done: Function) => {
      done();
    };

    return {
      name,
      check,
      requestData,
      drawerOpen,
      isMobile,
      filterItems,
      changeSort,
      drawerClose,
    };
  },
});
</script>
