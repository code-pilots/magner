<template>
  <el-table
    :data="data"
    :row-class-name="config.rowLink ? 'row-link' : ''"
    class="data-table"
    :height="tableHeight"
    @sort-change="sort"
  >
    <el-table-column
      v-for="column in config.columns"
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
    >
      <template #default="table">
        <router-link
          v-if="column.columnLink || config.rowLink"
          :to="column.columnLink ? column.columnLink(table.row) : config.rowLink(table.row)"
          class="cell-content"
        >
          {{ formatCell(column, table) }}
        </router-link>
        <div v-else class="cell-content">
          {{ formatCell(column, table) }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import 'core/assets/styles/components/data-table.css';
import { defineComponent, PropType } from 'vue';
import type { Table, TableColumn } from 'core/types/components/table';

export default defineComponent({
  name: 'DataTable',
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    config: {
      type: Object as PropType<Table>,
      required: true,
    },
    tableHeight: {
      type: String,
      default: 'auto',
    },
  },
  emits: ['sort'],
  setup (props, context) {
    const sort = (e) => {
      context.emit('sort', e);
    };

    const formatCell = (column: TableColumn, table: { row: any, column: any, $index: number }): any => {
      const content = table.row[column.prop];
      if (column.formatter) {
        return column.formatter(content, table.row, table.column, table.$index);
      }
      return content;
    };

    return {
      sort,
      formatCell,
    };
  },
});
</script>
