<template>
  <section class="table-page">
    <PageHeader :header="config.header" />

    <div v-if="hasFilters" class="table-page_top">
      <GenericForm
        ref="formRef"
        :config="{ ...config.filters, layout: topFilters }"
        :loading="false"
        :initial-data="requestData.filters"
        :request-data="{ ...requestData, selected }"
        class="table-page_top_filters"
        @submit="filterItems"
        @action="filtersAction"
      >
        <template #after>
          <el-button
            v-if="config.filters.fieldsShowAmount < allFilters.length"
            type="primary"
            class="more-filters"
            plain
            :icon="filterIcon"
            @click="drawerOpen = true"
          >
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
    </div>

    <Dynamic ref="dynamicRef" :request="config.request" :data="requestData">
      <template #default="{response, loading}">
        <div v-loading="loading" class="table-page_table">
          <DataTable
            ref="tableEl"
            :data="response.rows"
            :config="config.table"
            :table-height="tableHeight"
            @sort="changeSort"
            @select="select"
          />
        </div>

        <div v-if="selected.length" class="table-page_selection">
          <span>{{ selected.length }} {{ t('core.table.rows_selected') }}</span>
          <div class="flex-grow" />
          <el-button type="danger" size="mini" @click="removeRows">{{ t('core.table.remove') }}</el-button>
        </div>

        <div
          v-if="!selected.length && (response && response.pagination) && (requestData && requestData.pagination)"
          class="table-page_pagination"
        >
          <el-pagination
            v-model:currentPage="response.pagination.currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="parseInt(requestData.pagination.items) ?? 10"
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
import 'lib/assets/styles/pages/table.css';
import {
  computed,
  defineComponent, PropType, reactive, ref, shallowRef, watch, watchEffect,
} from 'vue';
import type { TableConfig } from 'lib/types/configs';
import type { ActionAction } from 'lib/types/utils/actions';
import type { FiltersActions } from 'lib/types/configs/pages/table';
import FilterIcon from 'lib/assets/icons/filter.svg';
import PlusIcon from 'lib/assets/icons/plus.svg';
import { useRoute, useRouter } from 'vue-router';
import { useMobile } from 'lib/utils/core/is-mobile';
import { useTranslate } from 'lib/utils/core/translate';
import { layoutToFields } from 'lib/utils/form/form';
import useDialogForm from 'lib/utils/form/use-dialog-form';
import useStore from 'lib/controllers/store/store';
import filterUrlDataComparison from 'lib/utils/form/filter-url-data-comparison';
import PageHeader from '../components/page-header.vue';
import DataTable from '../components/table.vue';
import Dynamic from '../components/dynamic.vue';
import GenericForm from '../components/form/form.vue';

type RowData = Record<string, unknown>;

export default defineComponent({
  name: 'TablePage',
  components: {
    PageHeader,
    DataTable,
    GenericForm,
    Dynamic,
  },
  props: {
    config: {
      type: Object as PropType<TableConfig<any>>,
      required: true,
    },
  },
  setup (props) {
    const tableEl = ref(null);

    const { t, customT } = useTranslate();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isMobile = useMobile();
    const drawerComponent = useDialogForm();

    const allFilters = computed(() => layoutToFields(props.config.filters.layout));
    const topFilters = computed(() => allFilters.value.slice(0, props.config.filters.fieldsShowAmount ?? undefined));

    const drawerOpen = ref(false);
    const formRef = ref<typeof GenericForm>();
    const dynamicRef = ref<typeof Dynamic>();

    const hasFilters = computed(() => !!(topFilters.value.length || props.config.filters.actions?.length));
    const hasHeader = computed(() => !!(props.config.header.title
      || (props.config.header.tabs && props.config.header.tabs.length)));
    const tableHeight = computed(() => {
      const navHeight = 50;
      const headerHeight = hasHeader.value ? 72 : 0;
      const topHeight = hasFilters.value ? 64 : 0;
      const bottomHeight = 40;

      let height;
      if (isMobile.value) height = navHeight + headerHeight + bottomHeight;
      else height = navHeight + headerHeight + topHeight + bottomHeight;

      return `calc(100vh - ${height + 1}px)`;
    });

    const requestData = reactive({
      pagination: { ...(props.config.filters.pagination || {}) },
      filters: { ...(props.config.filters.filtersData || {}) },
      sort: { ...(props.config.filters.sort || {}) },
    });

    const selected = ref<RowData[]>([]);

    // Depending on URL query existence and configuration, load initial data from URL or LocalStorage
    const initialData = props.config.filters.saveToLocalStorage && !Object.keys(route.query).length
      ? store.state.project.lstorage.deepRead('filters', route.name as string) as Record<string, any>
      : store.state.project.development.urlParsers.urlToData(route.query);
    filterUrlDataComparison(requestData, initialData);

    const appliedFilters = computed(() => Object.values(requestData.filters).filter((filter) => !!filter).length);
    const clearFilters = () => formRef.value!.clearForm?.();

    const filterItems = (form: Record<string, string>) => {
      requestData.filters = { ...form };
      requestData.pagination = { ...(props.config.filters.pagination || {}) };
      drawerOpen.value = false;
    };

    const filtersAction = async (action: ActionAction<FiltersActions>) => {
      if (action.emits === 'update-table') {
        await dynamicRef.value!.makeRequest();
      }
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

    const select = (rows: RowData[]) => {
      selected.value = rows;
    };

    const removeRows = async (rows: RowData[]) => {
      await props.config.table.rowSelectable?.removeAction?.(rows);
      selected.value = [];
      (tableEl.value as any)?.tableEl?.clearSelection?.();
    };

    watch(() => requestData, (val) => {
      const query = store.state.project.development.urlParsers.dataToUrl(val);
      router.push(route.path + query);
    }, { deep: true });

    watchEffect(() => {
      if (props.config.filters.saveToLocalStorage) {
        store.state.project.lstorage.deepPut('filters', route.name as string, { filters: requestData.filters });
      }
    });

    return {
      filterIcon: shallowRef(FilterIcon),
      plusIcon: shallowRef(PlusIcon),
      t,
      customT,
      requestData,
      drawerOpen,
      isMobile,
      drawerComponent,
      appliedFilters,
      formRef,
      dynamicRef,
      hasFilters,
      tableHeight,
      allFilters,
      topFilters,
      selected,
      tableEl,
      filtersAction,
      select,
      filterItems,
      changeSort,
      clearFilters,
      removeRows,
    };
  },
});
</script>
