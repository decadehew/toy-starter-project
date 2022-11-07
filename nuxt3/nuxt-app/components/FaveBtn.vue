<script setup>
import { NButton, createDiscreteApi } from 'naive-ui'
import { useUserunCollectApi, useUserCollectApi } from '@/apis/user'

const props = defineProps({
  isFave: {
    type: Boolean,
    default: false
  },
  goods_id: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'course'
  }
})

const isFave = ref(props.isFave)
const isLoading = ref(false)
const handleFave = () => {
  useHasAuth(async () => {
    isLoading.value = true
    const data = {
      goods_id: props.goods_id,
      type: props.type
    }

    const { error } = isFave.value ? (await useUserunCollectApi(data)) : (await useUserCollectApi(data))
    isLoading.value = false

    if (error.value) return
    const { message } = createDiscreteApi(['message'])
    message.success((isFave.value ? '取消收藏' : '收藏') + '成功')
    isFave.value = !isFave.value
  })
}

</script>
<template>
  <n-button
    :type="isFave ? 'primary' : tertiary"
    size="tiny"
    :loading="isLoading"
    @click="handleFave"
  >收藏</n-button>
</template>
