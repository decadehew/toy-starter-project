<script setup>
import { useIndexDataApi } from '@/apis/index'

useHead({
  title: '首頁',
  meta: [
    { name: 'keywords', content: 'Build your next application with Vue 3 and experience hybrid rendering, with an improved directory structure and new features Nuxt 3 is an open source framework making web development simple and powerful.' },
    { name: 'description', content: 'Build your next application with Vue 3 and experience hybrid rendering, with an improved directory structure and new features Nuxt 3 is an open source framework making web development simple and powerful.' },
  ]
})

const { data, pending, error } = await useIndexDataApi()

if (process.server && error.value) {
  throwError(error.value?.data.data)
}
</script>
<template>
  <loading-group :pending="pending" :error="error">
    <template v-for="(item, index) in data" :key="index">
      <Banner :data="item.data" v-if="item.type === 'swiper'" />
      <ImageNav :data="item.data"  v-else-if="item.type === 'icons'"/>
      <ImageAdsense :data="item.data" v-else-if="item.type === 'imageAd'" />
      <ListCard :data="item.data" :title="item.title" v-else-if="item.type == 'list'" />
      <!-- <ListCard :data="item.data" :type="item.listType" :title="item.title" v-else-if="item.type === 'promotion'" /> -->
    </template>
  </loading-group>
</template>
