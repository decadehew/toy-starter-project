<script setup>
import { NPagination } from 'naive-ui'
import { useUserFaveListApi, useUserunCollectApi } from '@/apis/user'

useHead({ title: '我的收藏' })

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useUserFaveListApi(page, limit)
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

const handleDeleteItem = async ({ goods_id, type, success, fail }) => {
  console.log('what', {goods_id, type})
  const { error } = await useUserunCollectApi({
    goods_id,
    type
  })

  if (error.value) {
    fail()
  } else {
    success()
    refresh()
  }
}

</script>
<template>
  <loading-group :pending="pending" :error="error" :is-empty="rows.length === 0">
    <div class="p-3">
      <UserFaveList
        v-for="item in rows"
        :key="item"
        :item="item"
        @delete="handleDeleteItem"
      />
    </div>
    <div class="flex justify-center items-center mt-5 !pb-[1.5rem]">
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
