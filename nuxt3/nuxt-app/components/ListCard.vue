<script setup>
import { NButton, NGrid, NGi } from 'naive-ui'
import { useGroupDataApi } from '@/apis/index'

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  title: {
    type: String,
    default: '展示 Title'
  }
})

const listData = ref(props.data || [])

if (props.type === 'group') {
  const { data } = await useGroupDataApi({ page: 1, usable: 1, limit: 8 })
  listData.value = (data.value?.rows).reverse() || []
}
</script>
<template>
  <div>
    <div class="flex mb-3">
      <span>{{title}}</span>
      <n-button quaternary class="ml-auto">查看更多</n-button>
    </div>
    <n-grid x-gap="12" :cols="4" class="mb-6">
      <n-gi v-for="item in listData" :key="item">
        <CourseList :item="item" />
      </n-gi>
    </n-grid>
  </div>
</template>