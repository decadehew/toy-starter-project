<script setup>
import { useBookDetailApi } from '@/apis/book'

const route = useRoute()
const { book_id, id } = route.params
const { data, error, pending } = await useBookDetailApi(book_id, id)

const title = computed(() => data.value ? data.value.title : '電子書詳情頁')
useHead({ title })

definePageMeta({
  middleware(to, from) {
    const { id } = to.params
    if (isNaN(+id)) {
      return abortNavigation('抱歉，頁面不存在')
    }

    return true
  }
})
</script>
<template>
  <loading-group :pending="pending" :error="error">
    <div v-html="data.content" v-if="data"></div>
  </loading-group>
</template>
