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
import { defineComponent, PropType } from 'vue';
import type { Table, TableColumn } from 'lib/types/components/table';
import { useTranslate } from 'lib/utils/core/translate';
import TableCell from 'lib/views/components/table/cell.vue';

export default defineComponent({
  name: 'DataTable',
  components: { TableCell },
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
      type: [String, Number],
      default: 'auto',
    },
  },
  emits: ['sort'],
  setup (props, context) {
    const { customT } = useTranslate();

    const sort = (e: unknown) => {
      context.emit('sort', e);
    };

    return {
      customT,
      sort,
    };
  },
});
</script>
