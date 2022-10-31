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

const handleOpen = () => {
  navigateTo(`/detail/${route.query.tab}/${props.item.id}`)
}
</script>
<template>
  <ui-card>
    <ui-card-header>
      <span class="mb-2 text-xs text-gray-400">學習進度</span>
      <NProgress type="line" :percentage="item.progress" :show-indicator="false" />
    </ui-card-header>
    <ui-card-body class="flex">
      <n-tag size="small" v-if="route.query.tab !== 'column'">{{courseType[item.type]}}</n-tag>
      <span class="ml-3">{{item.title}}</span>
      <n-button type="primary" size="tiny" @click="handleOpen">繼續觀看</n-button>
    </ui-card-body>
  </ui-card>
</template>
