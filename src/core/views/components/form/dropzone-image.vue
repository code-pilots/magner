<template>
  <div v-if="src" class="el-upload-dragger_image">
    <el-image :src="src" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DropzoneImage',
  props: {
    value: {
      type: [String, Number, Object] as PropType<string|File>,
      default: null,
    },
    srcKey: {
      type: String,
      default: 'src',
    },
  },
  async setup (props) {
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

    const src = await readAsDataURL(props.value);

    return {
      src,
    };
  },
});
</script>
