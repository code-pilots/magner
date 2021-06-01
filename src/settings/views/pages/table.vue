<template>
  <section class="table-page">
    <form class="table-page_filters" @submit.prevent>
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

    <Dynamic :request="config.request">
      <div class="table-page_table">
        <el-table :data="tableData">
          <el-table-column
            prop="date"
            label="Date"
            width="150"
          />
          <el-table-column
            prop="name"
            label="Name"
            width="120"
          />
          <el-table-column
            prop="state"
            label="State"
            width="120"
          />
          <el-table-column
            prop="city"
            label="City"
            width="120"
          />
          <el-table-column
            prop="address"
            label="Address"
            width="600"
          />
          <el-table-column
            prop="zip"
            label="Zip"
            width="120"
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

      <div class="table-page_pagination flex-center">
        <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[10, 25, 50, 100]"
          :page-size="25"
          :total="400"
          :pager-count="7"
          :small="isMobile"
          background
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </Dynamic>
  </section>
</template>

<script lang="ts">
import 'styles/pages/table.css';
import {
  defineComponent,
  PropType, ref,
} from 'vue';
import type { TableConfig, GlobalRouting } from 'settings/types/configs';
import Dynamic from 'settings/views/components/dynamic.vue';

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

const TABLE_DATA = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  }, {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
];

export default defineComponent({
  name: 'TablePage',
  components: { Dynamic },
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

    const currentPage = ref(1);

    return {
      sortOptions: SORT_OPTIONS,
      sortVal,
      name,
      check,
      currentPage,
      tableData: TABLE_DATA,
      isMobile: window.matchMedia('(max-width: 767px)').matches,
    };
  },
});
</script>
