<template>
  <section class="table-page">
    <div class="table-page_top">
      <GenericForm
        :config="config.filters"
        :loading="false"
        class="table-page_top_filters"
        @submit="filterItems"
      >
        <template #after>
          <div class="flex-grow" />
        </template>
      </GenericForm>

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
          <el-table
            :data="response[config.dataField]"
            @sort-change="changeSort"
          >
            <el-table-column
              v-for="column in config.table.columns"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
              :min-width="column.minWidth"
              :fixed="column.fixed"
              :resizable="column.resizable"
              :show-overflow-tooltip="column.showOverflowTooltip"
              :align="column.align"
              :header-align="column.headerAlign"
              :class-name="column.className"
              :label-class-name="column.labelClassName"
              :formatter="column.formatter"
              :render-header="column.renderHeader"
              :sortable="column.sortable ? 'custom' : false"
            />
          </el-table>
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
import Dynamic from '../components/dynamic.vue';
import GenericForm from '../components/form.vue';

export default defineComponent({
  name: 'TablePage',
  components: { GenericForm, Dynamic },
  props: {
    config: {
      type: Object as PropType<TableConfig>,
      required: true,
    },
  },
  setup (props) {
    const name = ref('');
    const check = ref(false);

    const requestData = reactive({
      pagination: { ...(props.config.filters.pagination || {}) },
      filters: { ...(props.config.filters.filtersData || {}) },
      sort: { ...(props.config.filters.sort || {}) },
    });

    const filterItems = () => {
      // console.log(form);
    };

    const changeSort = (sort: { column: any|null, prop: string|null, order: 'ascending'|'descending'|null }) => {
      // console.log(sort);
    };

    return {
      name,
      check,
      requestData,
      isMobile: window.matchMedia('(max-width: 767px)').matches,
      filterItems,
      changeSort,
    };
  },
});
</script>
