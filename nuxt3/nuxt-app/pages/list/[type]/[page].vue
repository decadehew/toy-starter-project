<script setup>
import { NGrid, NGi, NPagination, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useCourseListApi } from '@/apis/course'

definePageMeta({
  middleware: ['list']
})

const route = useRoute()
const title = route.meta.title

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useCourseListApi(page)
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
          <CourseList />
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
