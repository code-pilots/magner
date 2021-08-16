<template>
  <div>
    <el-button type="primary" @click="handleOpen">Create city</el-button>
    <span v-if="field.city">{{ field.city }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue';

/**
 * This is an example of the custom component used in the form. To make it properly suit the form,
 * you need to follow these rules while creating the component:
 *
 * 1) Add 'field' prop. It is an object from the config's field of type 'custom', 'props' property.
 * 2) The form has a key with field's name and its value. To change it, emit the 'update:modelValue' event
 * with new value. Make sure it matches the 'dataType' property from the config.
 * 3) You can configure validation of the field in the config. Wrapper components will display any errors occurred, so
 * there's no need to add any validations inside the component.
 * 4) If you need to interact with other fields, emit the 'action' event with any data. Then, in the config's
 * 'changeAction' field of this custom property, write the interactions. Event data will be passed there as 'data' arg.
 */
export default defineComponent({
  name: 'DialogOpener',
  props: {
    field: {
      type: Object as PropType<{ city: string }>,
      default: () => ({}),
    },
  },
  emits: ['action', 'update:modelValue'],
  setup (props, context) {
    const handleOpen = () => {
      context.emit('action', { type: 'click' });
    };

    watchEffect(() => {
      context.emit('update:modelValue', props.field.city);
    });

    return {
      handleOpen,
    };
  },
});
</script>

<style scoped>
div {
  width: 100%;
  display: flex;
}

.el-button {
  max-width: 200px ;
  margin-right: 12px;
}
</style>
