<template>
  <section class="table-page">
    <PageHeader
      ref="pageHeaderEl"
      :header="{
        ...config.header,
        actions: [
          ...(config.header.actions ? config.header.actions : []),
          ...(hasFilters ? [{
            type: 'action',
            props: {
              type: 'primary',
              text: t('core.table.filters'),
              icon: filterIcon,
              class: 'open-filters-btn',
            },
            action: toggleFilters,
          }] : []),
        ]
      }"
    />

    <div v-if="hasFilters && filtersOpened" id="id-table-page-top" class="table-page_top">
      <div class="table-page_filters-btn-container">
        <el-button
          type="primary"
          :text="t('core.table.filters_close')"
          plain
          :icon="closeIcon"
          @click="toggleFilters"
        />
      </div>

      <GenericForm
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
            actions: [{ type: 'action', emits: 'submit', props: { type: 'primary', text: t('core.table.filters_submit') }}],
            submitEvent: 'submit',
            size: 'default',
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

    <div class="table-page_filters" />

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
            @action="filtersAction"
          />
        </div>

        <div v-if="selected.length" class="table-page_selection">
          <span>{{ selected.length }} {{ t('core.table.rows_selected') }}</span>
          <div class="flex-grow" />
          <FormActions
            v-if="config.table.rowSelectable && config.table.rowSelectable.actions"
            :actions="config.table.rowSelectable.actions"
            :request-data="{ ...requestData, selected }"
            size="default"
            @action="filtersAction"
          />
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
import '../../assets/styles/pages/table.css';
import {
  computed,
  defineComponent, onBeforeUnmount, onMounted, PropType, reactive, ref, shallowRef, watch, watchEffect,
} from 'vue';
import type { TableConfig } from 'lib/types/configs';
import type { ActionAction } from 'lib/types/utils/actions';
import type { TableActions } from 'lib/types/configs/pages/table';
import FilterIcon from 'lib/assets/icons/filter.svg';
import PlusIcon from 'lib/assets/icons/plus.svg';
import CloseIcon from 'lib/assets/icons/x.svg';
import { useRoute, useRouter } from 'vue-router';
import { useMobile } from 'lib/utils/core/is-mobile';
import { useTranslate } from 'lib/utils/core/translate';
import { layoutToFields, parseUrl } from 'lib/utils/form/form';
import useDialogForm from 'lib/utils/form/use-dialog-form';
import useStore from 'lib/controllers/store/store';
import filterUrlDataComparison from 'lib/utils/form/filter-url-data-comparison';
import { isInWhiteList } from 'lib/utils/helpers/white-list';
import PageHeader from '../components/page-header.vue';
import DataTable from '../components/table.vue';
import Dynamic from '../components/dynamic.vue';
import GenericForm from '../components/form/form.vue';
import FormActions from '../components/form/form-actions.vue';

type RowData = Record<string, unknown>;

export default defineComponent({
  name: 'TablePage',
  components: {
    FormActions,
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
    const pageHeaderEl = ref(null);

    const { t, customT } = useTranslate();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isMobile = useMobile();
    const drawerComponent = useDialogForm();

    const allFilters = computed(() => layoutToFields(props.config.filters.layout));
    const topFilters = computed(() => allFilters.value.slice(0, props.config.filters.fieldsShowAmount ?? undefined));
    const filtersOpened = ref(false);

    const drawerOpen = ref(false);
    const dynamicRef = ref<typeof Dynamic>();

    const hasFilters = computed(() => !!(topFilters.value.length || props.config.filters.actions?.length));
    const hasHeader = computed(() => !!(props.config.header.title
      || (props.config.header.tabs && props.config.header.tabs.length)));
    const tableHeight = computed(() => {
      const navHeight = 50;
      const headerHeight = hasHeader.value ? (pageHeaderEl.value as any)?.$el.offsetHeight : 0;
      const bottomHeight = 40;

      const height = navHeight + headerHeight + bottomHeight;

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
      : parseUrl(route.query) || {};
    filterUrlDataComparison(requestData, initialData);

    const appliedFilters = computed(() => Object.values(requestData.filters)
      .filter((filter) => (filter && typeof filter === 'object'
        ? filter instanceof Date || Object.keys(filter)?.length
        : !!filter)).length);
    const clearFilters = () => requestData.filters = { ...(props.config.filters.filtersData || {}) };

    const filterItems = (form: Record<string, string>) => {
      requestData.filters = { ...form };
      requestData.pagination = { ...(props.config.filters.pagination || {}) };
      drawerOpen.value = false;
    };

    const filtersAction = async (action: ActionAction<TableActions>) => {
      if (action.emits === 'update-table') {
        await dynamicRef.value!.makeRequest();
        return;
      }
      if (action.emits === 'deselect-and-update') {
        await dynamicRef.value!.makeRequest();
        selected.value = [];
        return;
      }
      if (action.emits === 'deselect') {
        selected.value = [];
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
      router.push({ path: route.path, query: { data: encodeURI(JSON.stringify(val)) } });
    }, { deep: true });

    watchEffect(() => {
      if (props.config.filters.saveToLocalStorage) {
        store.state.project.lstorage.deepPut('filters', route.name as string, { filters: requestData.filters });
      }
    });

    const toggleFilters = () => {
      filtersOpened.value = !filtersOpened.value;
    };

    const clickedOutside = (e: MouseEvent) => {
      if (filtersOpened.value) {
        const content = document.getElementById('id-table-page-top') || undefined;

        if (
          e.target
          && !(e.target as HTMLElement).closest('.open-filters-btn')
          && !isInWhiteList(e.target, content)
        ) {
          toggleFilters();
        }
      }
    };

    onMounted(() => {
      document.addEventListener('click', clickedOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', clickedOutside);
    });

    return {
      filterIcon: shallowRef(FilterIcon),
      plusIcon: shallowRef(PlusIcon),
      closeIcon: shallowRef(CloseIcon),
      t,
      customT,
      requestData,
      drawerOpen,
      isMobile,
      drawerComponent,
      appliedFilters,
      dynamicRef,
      hasFilters,
      tableHeight,
      allFilters,
      topFilters,
      selected,
      tableEl,
      pageHeaderEl,
      filtersAction,
      select,
      filterItems,
      changeSort,
      clearFilters,
      removeRows,
      filtersOpened,
      toggleFilters,
    };
  },
});
</script>
