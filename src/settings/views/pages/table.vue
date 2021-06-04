<template>
  <section class="table-page">
    <div class="table-page_top">
      <GenericForm
        :fields="config.filters"
        :btn="config.submit"
        :loading="false"
        class="table-page_top_filters"
      >
        <template #after>
          <div class="flex-grow" />
        </template>
      </GenericForm>

      <router-link :to="{name: 'user', params: { id: 'new' }}" class="table-page_top_create">
        <el-button native-type="button" type="primary">Создать</el-button>
      </router-link>
    </div>

    <form v-if="false" class="table-page_filters" @submit.prevent>
      <div class="table-page_filters_inputs">
        <el-input
          v-model="name"
          placeholder="Название"
          class="table-page_filters_inputs_input"
        />

        <el-select
          v-model="sortVal"
          value-key="slug"
          class="table-page_filters_inputs_input"
        >
          <el-option
            v-for="option in sortOptions"
            :key="option.slug"
            :value="option"
            :label="option.name"
          />
        </el-select>

        <el-checkbox
          v-model="check"
          label="Подтвержден"
          class="table-page_filters_inputs_input"
        />
      </div>

      <div class="table-page_filters_actions">
        <el-button native-type="submit" type="primary">Поиск</el-button>
        <router-link :to="{name: 'user', params: { id: 'new' }}">
          <el-button native-type="button" type="primary">Создать</el-button>
        </router-link>
      </div>
    </form>

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

const SORT_OPTIONS = [
  {
    slug: '+id',
    name: 'ID ASC',
  },
  {
    slug: '-id',
    name: 'ID DESC',
  },
];

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
    const sortVal = ref(SORT_OPTIONS[0]);
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

    return {
      sortOptions: SORT_OPTIONS,
      sortVal,
      name,
      check,
      requestData,
      isMobile: window.matchMedia('(max-width: 767px)').matches,
    };
  },
});
</script>
