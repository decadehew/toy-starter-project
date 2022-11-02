<script setup>
import { NPagination } from 'naive-ui'
import { useUserPostListApi } from '@/apis/user'
import { useDeletePostApi } from '@/apis/bbs'

useHead({ title: '我的 Posts' })

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useUserPostListApi(page)
  return data
}

const {
  page,
  limit,
  pending,
  error,
  rows,
  refresh,
  total,
  paginatePageHandler
} = await usePaginatePage(queryCallbackFn)

const deleteItem = async ({ id, success, fail }) => {
  const { error } = await useDeletePostApi(id)

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
      <PostList
        v-for="item in rows"
        :key="item"
        :item="item"
        @delete="deleteItem"
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
