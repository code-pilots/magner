<template>
  <div
    v-loading="loading"
    class="el-upload_card"
    :class="{loading}"
    :draggable="draggable"
    @dragstart="emitDrag('dragstart', $event)"
    @dragend="emitDrag('dragend', $event)"
    @dragover="emitDrag('dragover', $event)"
    @drop="emitDrag('drop', $event)"
  >
    <template v-if="view">
      <el-image v-if="view.type === 'image'" :src="view.src" class="el-upload_media-image" />
      <el-image v-else-if="view.type === 'video'" :src="view.src" class="el-upload_media-video" />
      <div v-else class="el-upload_media-file">
        <svg-icon core="file" size="initial" class="el-upload_media-file_icon" />
        <div class="flex-grow" />
        <span v-if="view.caption" class="el-upload_media-file_caption">{{ view.caption }}</span>
        <span v-if="modelValue.size" class="el-upload_media-file_size">
          {{ getMegabytes(modelValue.size) }} Mb
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref,
} from 'vue';
import type { DropzoneFile, DropzoneFileView } from 'lib/types/form/fields/dropzone';
import SvgIcon from 'lib/views/components/icon.vue';

export default defineComponent({
  name: 'DropzoneImage',
  components: { SvgIcon },
  props: {
    modelValue: {
      type: [Object] as PropType<DropzoneFile>,
      required: true,
    },

    draggable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['change', 'dragstart', 'dragend', 'dragover', 'drop'],
  async setup (props, context) {
    const file = ref(props.modelValue);
    const view = ref<DropzoneFileView | null>(null);
    const loading = computed(() => file.value.loading);
    const err = ref<boolean>(false);

    props.modelValue.view.then((modelFile) => {
      view.value = modelFile;
    });

    props.modelValue.upload?.then((uploaded) => {
      if (!uploaded) {
        err.value = true;
      } else {
        file.value = uploaded;
        context.emit('change', uploaded);

        uploaded.view.then((newView) => {
          view.value = newView;
        });
      }
    });

    const getMegabytes = (size: number) => Number(size / 1024 / 1024).toFixed(2);

    const emitDrag = (name: 'dragstart'|'dragend'|'dragover'|'drop', event: DragEvent) => {
      context.emit(name, event);
    };

    return {
      file,
      view,
      err,
      loading,
      getMegabytes,
      emitDrag,
    };
  },
});
</script>
