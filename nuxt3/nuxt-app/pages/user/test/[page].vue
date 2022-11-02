<script setup>
import { NPagination } from 'naive-ui'
import { useUserExamTestApi } from '@/apis/user'

useHead({ title: '考試紀錄' })

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useUserExamTestApi(page)
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
  <loading-group :pending="pending" :error="error" :is-empty="rows.length === 0">
    <div class="p-3">
      <UserExamTestList
        v-for="item in rows"
        :key="item"
        :item="item"
      />
    </div>
    <div class="flex justify-cener items-center mt-5 !pb[1.5rem]">
      <NPagination
        :size="large"
        :item-count="total"
        :page="page"
        :page-size="limit"
        :on-update:page="paginatePageHandler"
      />
    </div>
  </loading-group>
</template>
