<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, watch } from 'vue';
import DataTable from './components/DataTable.vue';
import type { Header, Item } from './types/table';

const headers: Header[] = [
  {
    text: 'Name',
    value: 'name',
  },
  {
    text: 'Address',
    value: 'address',
  },
  {
    text: 'Height',
    value: 'height',
    sortable: true,
  },
  {
    text: 'Weight',
    value: 'weight',
    sortable: true,
  },
  {
    text: 'Age',
    value: 'calories',
    sortable: true,
  },
  {
    text: 'Calories',
    value: 'calories',
  },
  { text: 'Fat (g)', value: 'fat' },
  { text: 'Carbs (g)', value: 'carbs' },
  { text: 'Protein (g)', value: 'protein' },
  { text: 'Iron (%)', value: 'iron' },
];
const showItem = (item: Item): void => {
  console.log(item);
};
const itemsSelected = ref([]);
const serverOptions = ref({});

watch(serverOptions, (value) => {
  console.log('ServerOptions', value);
}, { deep: true });

const isServerLoading = ref(false);
const mockServerLoadPage = (pageNumber: number, rows: number): Item[] => {
  const mockItems = [];
  for (let i = 1; i < rows; i += 1) {
    const rowIdentification = (pageNumber - 1) * rows + i;
    mockItems.push({
      name: `name-page-${pageNumber}-row-${rowIdentification}`,
      address: `address-page-${pageNumber}-row-${rowIdentification}`,
      height: rowIdentification,
      weight: rowIdentification,
      age: rowIdentification,
      calories: rowIdentification,
      fat: rowIdentification,
      carbs: rowIdentification,
      protein: rowIdentification,
      iron: rowIdentification,
    });
  }

  return mockItems;
};

const items = ref(mockServerLoadPage(1, 100));
const serverLoadMore = async (loadQuery: { pageNumber: number, rows: number}) => {
  isServerLoading.value = true;
  const { pageNumber, rows } = loadQuery;
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const newPageItems = mockServerLoadPage(pageNumber, rows);
  items.value = items.value.concat(newPageItems);
  isServerLoading.value = false;
};
</script>
<template>
  <h2>ServerSide Mode</h2>
  <DataTable
    v-model:itemsSelected="itemsSelected"
    v-model:serverOptions="serverOptions"
    :headers="headers"
    :items="items"
    :server-items-length="100"
    :loading="isServerLoading"
    :body-font-size="15"
    :header-font-size="15"
    :buttons-pagination="true"
    @click-item="showItem"
  >
  </DataTable>
</template>
<style>
</style>
