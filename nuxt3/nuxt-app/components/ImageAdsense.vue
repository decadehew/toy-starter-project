<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: []
  }
})
</script>
<template>
  <img
    v-for="item in data"
    :key="item"
    :src="item.src"
    @click="$commonOpen(item)"
    class="w-[100%] h-[120px] rounded mb-6 cursor-pointer"
  />
</template>
