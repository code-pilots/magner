<template>
  <slot v-if="!readOnly" />
  <slot v-else name="readonly" v-bind="{text: readOnlyText}">
    <div :class="{'gray-block': grayBlock}" class="readonly-block">
      {{ readOnlyText || value }}
    </div>
  </slot>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { GenericComponent } from 'lib/types/form';
import { useChecks } from 'lib/utils/core/mixed-check';

export default defineComponent({
  name: 'ReadonlyWrap',
  props: {
    field: {
      type: Object as PropType<GenericComponent>,
      required: true,
    },
    value: {
      type: [Number, String, Object, Array],
      required: true,
    },
    grayBlock: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props) => {
    const { readOnly, readOnlyText } = useChecks(props.field, props.value);

    return {
      readOnly,
      readOnlyText,
    };
  },
});
</script>
