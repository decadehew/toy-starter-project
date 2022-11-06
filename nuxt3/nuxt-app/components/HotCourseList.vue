<script setup>
import { useHotCourseListApi } from '@/apis/course'

const { data } = await useHotCourseListApi()
</script>
<template>
  <section class="b-white shadow rounded mb-5">
    <div class="p-3 border-b">
      <h4>精品推薦</h4>
      <div>
        <CourseList
          v-for="item in data"
          :key="index"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>
