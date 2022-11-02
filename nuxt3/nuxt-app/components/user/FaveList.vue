<script setup>
import { NTag, NImage, NButton, createDiscreteApi } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})

const state = {
  course: '課程',
  column: '專欄',
  book: '電子書',
  live: '直播'
}

const emits = defineEmits(['delete'])
const isLoading = ref(false)
const handleOpen = () => {
  navigateTo(`/detail/${props.item.type}/${props.item.goods.id}`)
}
const handleDeleteItem = () => {
  const { dialog, message } = createDiscreteApi(['dialog', 'message'])

  dialog.warning({
    content: '確定要刪除此收藏',
    positiveText: '確定',
    negativeText: '取消',
    onPositiveClick: async () => {
      isLoading.value = true
      emits('delete', {
        goods_id: props.item.goods.id,
        type: props.item.type,
        success () {
          message.success('刪除收藏成功')
          isLoading.value = false
        },
        fail () {
          isLoading.value = false
        }
      })
    }
  })
}

</script>
<template>
  <div class="flex items-center border mb-5 p-3">
    <n-tag :bordered="false" type="info" size="small">{{state[item.type]}}</n-tag>
    <NImage
      class="w-[40px] rounded ml-3 mr-3"
      :src="item.goods.cover"
    />
    <span class="text-gray-500 text-sm">{{item.goods.title}}</span>
    <n-button class="ml-auto mr-3" type="success" size="tiny" @click="handleOpen">查看</n-button>
    <n-button type="error" size="tiny" @click="handleDeleteItem" :loading="isLoading">刪除</n-button>
  </div>
</template>
