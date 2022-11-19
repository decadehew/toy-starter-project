<script setup>
import { NTag } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  },
  index: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: false
  }
})

const typeObj = {
  media: '圖文',
  video: '視頻',
  audio: '音頻'
}

</script>
<template>
  <li class="detail-menu-item" :class="{active: active}">
    <n-tag
      :bordered="false"
      type="info"
      size="small"
      class="mr-3"
      v-if="item.type"
    >{{typeObj[item.type]}}</n-tag>
    章節{{index+1}}&ensp;{{item.title}}
    <n-tag
      :bordered="false"
      type="info"
      size="small"
      class="ml-auto watch"
      v-if="item.price == 0 || item.isfree == 1"
    >免費觀看</n-tag>
  </li>
</template>
<style scoped>
.detail-menu-item {
  @apply flex p-5 border-b cursor-pointer text-sm hover: ( !bg-gray-100) active:( !bg-gray-200)
}
.watch{
  @apply cursor-pointer
}
.active {
  @apply bg-gray-200
}
</style>
