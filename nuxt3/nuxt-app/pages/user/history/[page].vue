<script setup>
import { NPagination } from 'naive-ui'
import { useUserHistoryApi } from '@/apis/user'

useHead({ title: '學習紀錄' })
const route = useRoute()
const type = ref(route.query.tab || 'course')
const TABS = [
  {
    label: '課程',
    value: 'course'
  },
  {
    label: '專欄',
    value: 'column'
  }
]

const handleClick = (tab) => {
  navigateTo({
    params: {
      ...route.params,
      page: 1
    },
    query: {
      ...route.query,
      tab
    }
  })
}

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useUserHistoryApi(() => {
    return {
      type: type.value,
      page
    }
  })

  return data
}

const {
  page,
  limit,
  pending,
  error,
  rows,
  total,
  paginatePageHandler
} = await usePaginatePage(queryCallbackFn)

</script>
<template>
  <div>
    <ui-tab>
      <ui-tab-item
        v-for="(item, index) in TABS"
        :key="index"
        :active="type === item.value"
        @click="() => handleClick(item.value)"
      >
        {{item.label}}
      </ui-tab-item>
    </ui-tab>
    <loading-group :pending="pending" :error="error" :is-empty="rows.length === 0">
      <div class="px-3">
        <UserHistoryList v-for="(item, index) in rows" :key="index" :item="item" />
      </div>
      <div class="flex justify-center items-center mt-5 !pb-[1.5rem]">
        <NPagination
          size="large"
          :item-count="total"
          :page="page"
          :page-size="limit"
          :on-update:page="paginatePageHandler"
        />
      </div>
    </loading-group>
  </div>
</template>
