<script setup>
import { NGrid, NGi, NPagination } from 'naive-ui'
import { useSearchListApi } from '~~/apis/common'

definePageMeta({
  middleware: ['search']
})

const route = useRoute()
const title = ref(route.query.keyword || '')
useHead({ title })
const type = ref(route.params.type)
const tabs = [
  {
    label: '課程',
    value: 'course'
  },
  {
    label: '專欄',
    value: 'column'
  }
]
const handleClick = (type) => {
  navigateTo({
    params: {
      ...route.params,
      type
    },
    query: {
      ...route.query
    }
  })
}

// // not working
// const {
//   page,
//   limit,
//   pending,
//   error,
//   refresh,
//   rows,
//   total,
//   paginatePageHandler
// } = await usePaginatePage(({ page }) => {
//   return useSearchListApi({
//     page,
//     keyword: encodeURIComponent(title.value),
//     type: type.value
//   })
// })

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useSearchListApi(() => {
    return {
      type: type.value,
      page,
      keyword: encodeURIComponent(title.value)
    }
  })

  return data
}

const {
  page,
  limit,
  pending,
  error,
  refresh,
  rows,
  total,
  paginatePageHandler
} = await usePaginatePage(queryCallbackFn)

// const page = ref(parseInt(route.params.page))
// const limit = ref(10)
// const { data, pending, error, refresh } = await useSearchListApi({
//   page: page.value,
//   keyword: encodeURIComponent(title.value),
//   type: type.value
// })

// const rows = computed(() => data.value?.rows ?? [])
// const total = computed(() => data.value?.count ?? 0)
// const paginatePageHandler = (page) => {
//   navigateTo({
//     params: {
//       ...route.params,
//       page
//     },
//     query: {
//       ...route.query
//     }
//   })
// }

const stop = watch(
  () => route.query.keyword,
  (val) => {
    title.value = val
    // debugger
    refresh()
  }
)

onBeforeUnmount(() => {
  stop()
})
</script>
<template>
  <div>
    <h4 class="text-lg my-3">
      <strong class="text-orang-400">{{title}}</strong>的搜尋結果：
    </h4>
    <ui-tab>
      <ui-tab-item
        v-for="item in tabs"
        :key="item.value"
        :active="type === item.value"
        @click="() => handleClick(item.value)"
      >
        {{item.label}}
      </ui-tab-item>
    </ui-tab>
    <loading-group :pending="pending" :error="error" :is-empty="rows.length === 0">
      <template #loading>
        <!-- 替換默認 skeleton -->
        <LoadingCourseSkeleton />
      </template>
      <n-grid :x-gap="20" :cols="4">
        <n-gi v-for="(item, index) in rows" :key="index">
          <CourseList :item="item" />
        </n-gi>
      </n-grid>
      <div class="flex justify-center items-center mt-5 mb-10">
        <NPagination
          :size="large"
          :item-count="total"
          :page="page"
          :page-size="limit"
          :on-update:page="paginatePageHandler"
        />
      </div>
    </loading-group>
  </div>
</template>
