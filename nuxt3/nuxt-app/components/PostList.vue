<script setup>
import { NTag, NImage, NButton, NIcon, createDiscreteApi } from 'naive-ui'
import { ThumbsUpSharp, ChatboxEllipsesOutline } from '@vicons/ionicons5'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})

const emits = defineEmits(['delete'])
const isLoading = ref(false)
const { isLoadingBySupport, handleSupport } = useSupportPost()
const handleOpen = () => {
  navigateTo(`/post_detail/${props.item.id}`)
}
const handleDelPostItem = () => {
  const { dialog, message } = createDiscreteApi(['dialog', 'message'])

  dialog.warning({
    content: '確定要刪除此帖',
    positiveText: '確定',
    negativeText: '取消',
    onPositiveClick: async () => {
      isLoading.value = true
      emits('delete', {
        id: props.item.id,
        success () {
          message.success('刪除成功')
          isLoading.value = false
        },
        fail () {
          // message.error('刪除失敗')
          isLoading.value = false
        }
      })
    }
  })
}

</script>
<template>
  <div class="border-b p-5">
    <div class="cursor-pointer text-gray-600" @click="handleOpen">
      <n-tag v-if="item.is_top" :bordered="false" type="success" size="small">置頂</n-tag>
      {{item.desc.text}}
    </div>
    <div class="mt-3 cursor-pointer max-w-[500px]">
      <NImage
        class="mr-3 mb-2 rounded"
        v-for="img in item.desc.images"
        :key="img"
        :src="img"
        :width="item.desc.images.length == 1 ? 300 : 150"
        :height="item.desc.images.length == 1 ? 200 : 100"
      />
    </div>
    <div class="flex mt-5">
      <n-button
        secondary
        strong
        size="tiny"
        class="mr-3"
        :type="item.issupport ? 'primary' : 'tertiary'"
        :loading="isLoadingBySupport"
        @click.stop="() => handleSupport(item)"
      >
        <template #icon>
          <n-icon>
            <ThumbsUpSharp />
          </n-icon>
        </template>
        點贊 {{item.support_count || 0}}
      </n-button>
      <n-button secondary strong size="tiny" class="mr-3">
        <template #icon>
          <n-icon>
            <ChatboxEllipsesOutline />
          </n-icon>
        </template>
        評論 {{item.comment_count || 0}}
      </n-button>
      <n-button text size="tiny" class="mr-3">作者：{{item.user_name}}</n-button>
      <n-button size="tiny" type="error"  @click="handleDelPostItem" :loading="isLoading">刪除</n-button>
    </div>
  </div>
</template>
