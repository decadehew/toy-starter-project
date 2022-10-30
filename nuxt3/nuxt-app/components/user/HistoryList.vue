<script setup>
import { NButton, NProgress, NTag } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})

const route = useRoute()
const courseType = {
  audio: '音頻',
  video: '視頻',
  media: '圖文',
  course: '課程',
  column: '專欄',
  book: '電子書'
}
</script>
<template>
  <div class="rounded border mb-5">
    <div class="bg-gray-50 p-3">
      <span class="mb-2 text-xs text-gray-400">學習進度</span>
      <NProgress type="line" :percentage="item.progress" :show-indicator="false" />
    </div>
    <div class="flex p-3">
      <n-tag size="small" v-if="route.query.tab !== 'column'">{{courseType[item.type]}}</n-tag>
      <span class="ml-3">{{item.title}}</span>
      <n-button type="primary" size="tiny">繼續觀看</n-button>
    </div>
  </div>
</template>
