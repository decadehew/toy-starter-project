<script setup>
import { NCarousel } from 'naive-ui'

const props = defineProps({
  data: {
    type: Array,
    default: []
  }
})
</script>
<template>
  <n-carousel class="mb-6" show-arrow>
    <img
      v-for="item in data"
      :key="item"
      :src="item.src"
      @click="() => $commonOpen(item)"
    />
  </n-carousel>
</template>
<style>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>