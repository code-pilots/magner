<template>
  <el-table
    ref="tableEl"
    :data="data"
    :row-class-name="config.rowLink ? 'row-link' : ''"
    class="data-table"
    :height="tableHeight"
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
          :to="column.columnLink ? column.columnLink(table.row) : config.rowLink(table.row)"
          class="cell-content"
        >
          <TableCell :column-config="column" :table-data="table" />
        </router-link>
        <div v-else class="cell-content">
          <TableCell :column-config="column" :table-data="table" />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import 'lib/assets/styles/components/data-table.css';
import { defineComponent, PropType, ref } from 'vue';
import type { Table, TableColumn } from 'lib/types/components/table';
import { useTranslate } from 'lib/utils/core/translate';
import TableCell from 'lib/views/components/table/cell.vue';

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
  emits: ['sort', 'select'],
  setup (props, context) {
    const { customT } = useTranslate();
    const tableEl = ref(null);

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
    };
  },
});
</script>
