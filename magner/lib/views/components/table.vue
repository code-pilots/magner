<template>
  <el-table
    ref="tableEl"
    :data="data"
    :row-class-name="config.rowLink ? 'row-link' : ''"
    :row-key="config.rowTree ? config.rowTree.key : ''"
    :tree-props="{ children: config?.rowTree?.childrenListKey ?? '' }"
    class="data-table"
    :height="tableHeight"
    :stripe="config.stripe"
    :border="config.border"
    :fit="config.fit"
    :table-layout="config.tableLayout"
    :flexible="config.flexible"
    :scrollbar-always-on="config.scrollbarAlwaysOn"
    @sort-change="sort"
    @selection-change="select"
  >
    <el-table-column
      v-if="config.rowSelectable"
      type="selection"
      width="40"
      align="center"
    />

    <el-table-column
      v-for="column in config.columns"
      :key="column.prop"
      :prop="column.prop"
      :label="customT(column.label)"
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
    >
      <template #default="table">
        <router-link
          v-if="column.columnLink || config.rowLink"
          :to="column.columnLink ? column.columnLink(table.row, route) : config.rowLink(table.row, route)"
          class="cell-content"
        >
          <TableCell :column-config="column" :table-data="table" @action="$emit('action', $event)" />
        </router-link>
        <div v-else class="cell-content">
          <TableCell :column-config="column" :table-data="table" @action="$emit('action', $event)" />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import '../../assets/styles/components/data-table.css';
import { defineComponent, PropType, ref } from 'vue';
import type { Table, TableColumn } from 'lib/types/components/table';
import { useTranslate } from 'lib/utils/core/translate';
import TableCell from 'lib/views/components/table/cell.vue';
import { useRoute } from 'vue-router';

type RowData = Record<string, unknown>;

export default defineComponent({
  name: 'DataTable',
  components: { TableCell },
  props: {
    data: {
      type: Array as PropType<RowData[]>,
      default: () => ([]),
    },
    config: {
      type: Object as PropType<Table>,
      required: true,
    },
    tableHeight: {
      type: [String, Number],
      default: 'auto',
    },
  },
  emits: ['sort', 'select', 'action'],
  setup (props, context) {
    const { customT } = useTranslate();
    const tableEl = ref(null);
    const route = useRoute();

    const sort = (e: unknown) => {
      context.emit('sort', e);
    };

    const select = (rows: Record<string, unknown>[]) => {
      context.emit('select', rows);
    };

    return {
      customT,
      tableEl,
      sort,
      select,
      route,
    };
  },
});
</script>
