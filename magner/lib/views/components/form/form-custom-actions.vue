<template>
  <div class="generic-form_actions custom">
    <template
      v-for="(action, i) in customActions"
      :key="i"
    >
      <component
        :is="action.component()"
        v-bind="{ requestData }"
        @action="emit('action', action)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  PropType,
  defineProps,
  defineEmits,
} from 'vue';
import { CustomAction } from 'lib/types/utils/actions';

defineComponent({ name: 'FormCustomActions' });

const props = defineProps({
  customActions: {
    type: Array as PropType<CustomAction[]>,
    default: () => ([]),
  },
  requestData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['action']);
</script>
