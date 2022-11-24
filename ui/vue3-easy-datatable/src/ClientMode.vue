<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, computed } from 'vue';
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
// 已勾選【筆數】
const itemsSelected = ref([]);
const createMockItems = (): Item[] => {
  const mockItems = [];
  for (let i = 1; i < 101; i += 1) {
    mockItems.push({
      name: `name-${i}`,
      address: `address-${i}`,
      height: i,
      weight: i,
      age: i,
      calories: i,
      fat: i,
      carbs: i,
      protein: i,
      iron: i,
    });
  }

  return mockItems;
};

const itemSelectHandler = (item: any): void => {
  itemsSelected.value = item;
};

const items = createMockItems();
console.log(items);
</script>
<template>
  <h2>Client Mode</h2>
  <!-- <DataTable
    :items-selected="itemsSelected"
    :headers="headers"
    :items="items"
    :rows-per-page="10"
    :rows-items="[10, 15, 20, 50]"
    @click-item="showItem"
    @update:items-selected="itemSelectHandler"
  /> -->
  <!-- 等價 -->
  <!-- https://cn.vuejs.org/guide/components/events.html#usage-with-v-model -->
  <br><br>
  <DataTable
    v-model:itemsSelected="itemsSelected"
    :headers="headers"
    :items="items"
    :rows-per-page="10"
    :rows-items="[10, 15, 20, 50]"
    @click-item="showItem"
  >
    <!-- https://cn.vuejs.org/guide/components/slots.html#scoped-slots -->
    <!-- #{name} 簡寫方式 -->
    <!-- 從插槽 v-bind 傳遞 props，item object，解構方式取出 object 其中一個屬性 -->
    <template #address="{ address }">
      <div style="color: red">
        {{ address }}
      </div>
    </template>
  </DataTable>
</template>
<style>
</style>
