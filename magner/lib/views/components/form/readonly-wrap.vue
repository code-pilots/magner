<template>
  <slot v-if="!readOnly" />
  <slot v-else name="readonly" v-bind="{text: readOnlyText}">
    <div :class="{'gray-block': grayBlock}" class="readonly-block">
      {{ readOnlyText }}
    </div>
  </slot>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { GenericComponent } from 'lib/types/form';
import { useChecks } from 'lib/utils';

export default defineComponent({
  name: 'ReadonlyWrap',
  props: {
    field: {
      type: Object as PropType<GenericComponent<any>>,
      required: true,
    },
    value: {
      type: [String, Number, Object, Array, Boolean],
      default: '',
    },
    grayBlock: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['blur'],
  setup: (props) => {
    const { readOnly, readOnlyText } = useChecks(props.field, props.value);

    return {
      readOnly,
      readOnlyText,
    };
  },
});
</script>
