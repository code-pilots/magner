<template>
  <div
    v-if="src"
    v-loading="loading"
    class="el-upload-dragger_image"
    :class="{loading}"
    :draggable="draggable"
    @dragstart="emitDrag('dragstart', $event)"
    @dragend="emitDrag('dragend', $event)"
    @dragover="emitDrag('dragover', $event)"
    @drop="emitDrag('drop', $event)"
  >
    <el-image :src="src" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';

export default defineComponent({
  name: 'DropzoneImage',
  props: {
    modelValue: {
      type: [String, Number, Object] as PropType<string|File>,
      default: null,
    },

    /** When value passed as an object, this property helps to distinguish which key of an object has an image value */
    srcKey: {
      type: String,
      default: 'src',
    },

    draggable: {
      type: Boolean,
      default: true,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
  async setup (props, context) {
    const src = ref<string|null>(null);
    const isFile = ref<boolean>(false);

    const readAsDataURL = (file: File | string): Promise<string|null> => new Promise((resolve) => {
      if (typeof file === 'string') {
        resolve(file);
      } else if (file instanceof File) {
        // TODO: if element is not an image, still display it
        if (file['type'].split('/')[0] !== 'image') resolve(null); // eslint-disable-line

        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(file);
      } else {
        resolve(file[props.srcKey]);
      }
    });

    watchEffect(async () => {
      src.value = await readAsDataURL(props.modelValue);
    });

    src.value = await readAsDataURL(props.modelValue);

    const emitDrag = (name: string, event: DragEvent) => {
      context.emit(name, event);
    };

    return {
      src,
      isFile,
      emitDrag,
    };
  },
});
</script>
