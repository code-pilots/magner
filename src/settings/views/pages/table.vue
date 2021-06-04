<template>
  <section class="table-page">
    <div class="table-page_top">
      <GenericForm
        :fields="config.filters"
        :btn="config.submit"
        :loading="false"
        class="table-page_top_filters"
        @submit="filterItems"
      >
        <template #after>
          <div class="flex-grow" />
        </template>
      </GenericForm>

      <router-link :to="{name: 'user', params: { id: 'new' }}" class="table-page_top_create">
        <el-button native-type="button" type="primary">Создать</el-button>
      </router-link>
    </div>

    <Dynamic :request="config.request" :data="requestData">
      <template #default="{response, loading}">
        <div v-loading="loading" class="table-page_table">
          <el-table :data="response[config.dataField]">
            <el-table-column
              v-for="row in config.table"
              :key="row.prop"
              :prop="row.prop"
              :label="row.label"
              :width="row.width"
            />
            <el-table-column
              fixed="right"
              label="Operations"
              width="100"
            >
              <template #default="scope">
                <el-button type="text" size="small">
                  Edit {{ scope.$index }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="response.pagination" class="table-page_pagination flex-center">
          <el-pagination
            v-model:currentPage="response.pagination.currentPage"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="requestData.items"
            :total="response.total"
            :pager-count="7"
            :small="isMobile"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="requestData.page = $event"
            @size-change="requestData.items = $event"
          />
        </div>
      </template>
    </Dynamic>
  </section>
</template>

<script lang="ts">
import 'styles/pages/table.css';
import {
  defineComponent,
  PropType, reactive, ref,
} from 'vue';
import type { TableConfig, GlobalRouting } from 'settings/types/configs';
import Dynamic from 'settings/views/components/dynamic.vue';
import GenericForm from 'settings/views/components/form.vue';

export default defineComponent({
  name: 'TablePage',
  components: { GenericForm, Dynamic },
  props: {
    config: {
      type: Object as PropType<TableConfig>,
      required: true,
    },
    globalRoutes: {
      type: Object as PropType<GlobalRouting>,
      required: true,
    },
  },
  setup () {
    const name = ref('');
    const check = ref(false);

    const requestData = reactive({
      page: 1,
      items: 100,
      filters: {
        patientId: 0,
        clinicId: 0,
        doctorId: 0,
        fullName: '',
      },
      sort: {
        receptionDate: 'asc',
        fullName: 'asc',
      },
    });

    const filterItems = (form) => {
      console.log(form);
    };

    return {
      name,
      check,
      requestData,
      isMobile: window.matchMedia('(max-width: 767px)').matches,
      filterItems,
    };
  },
});
</script>
