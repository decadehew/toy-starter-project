<script setup>
import { NGrid, NGi, NPagination, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useListApi } from '@/apis/common'

definePageMeta({
  middleware: ['list']
})

const route = useRoute()
const { type } = route.params
const title = route.meta.title

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useListApi(type, { page })
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
    <n-breadcrumb class="mb-5">
      <n-breadcrumb-item>
        <nuxt-link to="/">首頁</nuxt-link>
      </n-breadcrumb-item>
      <n-breadcrumb-item>{{title}}</n-breadcrumb-item>
    </n-breadcrumb>
    <loading-group :pending="pending" :error="error" :is-empty="rows.length === 0">
      <template #loading>
        <LoadingCourseSkeleton />
      </template>
      <n-grid :x-gap="20" :cols="4">
        <n-gi v-for="item in rows" :key="item">
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
