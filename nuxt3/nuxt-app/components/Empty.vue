<script setup>
import { NEmpty } from 'naive-ui'

const props = defineProps({
  desc: {
    type: String,
    default: '無資料'
  }
})

</script>
<template>
  <NEmpty :description="desc" size="large" class="py-10" />
</template>
