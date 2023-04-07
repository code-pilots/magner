<template>
  <div class="magner-not-found">
    <div class="magner-not-found_icon">
      <svg-importer :icon="() => import('lib/assets/icons/not-found.svg')" />
    </div>
    <div class="magner-not-found_message">
      <h1>{{ t('core.messages.not_found_title') }}</h1>
      <p>{{ t('core.messages.not_found_disc') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import '../../assets/styles/pages/404.css';
import { defineComponent } from 'vue';
import SvgImporter from 'lib/views/components/svg-importer.vue';
import { useTranslate } from 'lib/utils';

export default defineComponent({
  name: 'ErrorPage',
  components: { SvgImporter },
  setup () {
    const { t } = useTranslate();

    return {
      t,
    };
  },

});
</script>
