<template>
  <template v-if="formattedCell.view === 'custom'">
    <component
      :is="formattedCell.component"
      :row="formattedCell.row"
      :column="formattedCell.column"
    />
  </template>

  <template v-else-if="formattedCell.view === 'text'">
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
      :color="tag.backgroundColor"
      :style="tag.color ? `color: ${tag.color}` : ''"
      class="cell-content_images_tag"
    >
      {{ tag.text }}
    </el-tag>
  </div>

  <div v-else-if="formattedCell.view === 'actions'" class="cell-content_actions">
    <FormActions
      :actions="formattedCell.actions"
      :request-data="tableData"
      size="default"
      @action="act"
    />
  </div>

  <template v-else>
    {{ formattedCell.content }}
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import type { TableColumn } from 'lib/types/components/table';
import type { ActionAction } from 'lib/types/utils/actions';
import type { TableActions } from 'lib/types/configs/pages/table';
import FormActions from 'lib/views/components/form/form-actions.vue';

interface TableData {
  row: any,
  column: any,
  $index: number,
}

export default defineComponent({
  name: 'TableCell',
  components: { FormActions },
  props: {
    columnConfig: {
      type: Object as PropType<TableColumn<any>>,
      required: true,
    },

    tableData: {
      type: Object as PropType<{row: any, column: any, $index: number}>,
      required: true,
    },
  },
  emits: ['action'],
  setup (props, context) {
    const formattedCell = computed(() => {
      let content = props.tableData.row[props.columnConfig.prop];

      if (props.columnConfig.view?.type === 'custom' && !!props.columnConfig.view?.component) {
        return {
          view: 'custom',
          content,
          row: props.tableData.row,
          column: props.tableData.column,
          component: props.columnConfig.view.component(),
        };
      }

      if (props.columnConfig.view?.formatter) {
        content = props.columnConfig?.view.formatter(
          content,
          props.tableData.row,
          props.tableData.column,
          props.tableData.$index,
        );
      } else if (props.columnConfig.view?.nestedKey && typeof content === 'object') {
        content = Array.isArray(content)
          ? content.map((item) => item?.[props.columnConfig.view?.nestedKey as string] || null)
          : content?.[props.columnConfig.view.nestedKey] || null;
      }

      if (!props.columnConfig.view || props.columnConfig.view.type === 'text') {
        return {
          view: 'text' as 'view',
          text: content,
        };
      }

      if (props.columnConfig.view.type === 'image') {
        return {
          view: 'image' as 'image',
          images: Array.isArray(content) ? content : [content],
        };
      }

      if (props.columnConfig.view.type === 'tags') {
        const tags = [];
        if (!Array.isArray(content)) {
          tags.push({
            text: content,
            backgroundColor: '#ecf5ff',
          });
        } else {
          content.map((item: unknown) => {
            if (typeof item === 'object') {
              tags.push(item);
            } else {
              tags.push({
                text: item,
                backgroundColor: '#ecf5ff',
              });
            }

            return item;
          });
        }
        return {
          view: 'tags' as 'tags',
          tags,
        };
      }

      if (props.columnConfig.view.type === 'actions') {
        return {
          view: 'actions' as 'actions',
          actions: props.columnConfig.view.actions || [],
          value: content,
        };
      }

      return {
        view: props.columnConfig.view,
        content,
      };
    });

    const act = async (action: ActionAction<TableActions>) => {
      context.emit('action', action);
    };

    return {
      formattedCell,
      act,
    };
  },
});
</script>
