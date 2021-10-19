<template>
  <template v-if="formattedCell.view === 'text'">
    {{ formattedCell.text }}
  </template>

  <div v-else-if="formattedCell.view === 'image'" class="cell-content_images">
    <el-image
      v-for="(img, i) in formattedCell.images"
      :key="i"
      :src="img"
      class="cell-content_images_image"
      fit="cover"
      lazy
    />
  </div>

  <div v-else-if="formattedCell.view === 'tags'" class="cell-content_tags">
    <el-tag
      v-for="(tag, i) in formattedCell.tags"
      :key="i"
      class="cell-content_images_tag"
    >
      {{ tag }}
    </el-tag>
  </div>

  <template v-else>
    {{ formattedCell.content }}
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { TableColumn } from 'lib/types/components/table';

interface TableData {
  row: any,
  column: any,
  $index: number,
}

export default defineComponent({
  name: 'TableCell',
  props: {
    columnConfig: {
      type: Object as PropType<TableColumn<any>>,
      required: true,
    },

    tableData: {
      type: Object as PropType<{}>,
      required: true,
    },
  },
  setup (props) {
    const formattedCell = computed(() => {
      let content = props.tableData.row[props.columnConfig.prop];
      if (props.columnConfig.nestedKey && typeof content === 'object') {
        content = Array.isArray(content)
          ? content.map((item) => item?.[props.columnConfig.nestedKey] || null)
          : content?.[props.columnConfig.nestedKey] || null;
      }

      if (!props.columnConfig.view || props.columnConfig.view === 'text') {
        const formatted: string = props.columnConfig.formatter ? props.columnConfig.formatter(content,
          props.tableData.row,
          props.tableData.column,
          props.tableData.$index) : content;

        return {
          view: 'text' as 'view',
          text: formatted,
        };
      }

      if (props.columnConfig.view === 'image') {
        return {
          view: 'image' as 'image',
          images: Array.isArray(content) ? content : [content],
        };
      }

      if (props.columnConfig.view === 'tags') {
        return {
          view: 'tags' as 'tags',
          tags: Array.isArray(content) ? content : [content],
        };
      }

      return {
        view: props.columnConfig.view,
        content,
      };
    });

    return {
      formattedCell,
    };
  },
});
</script>
