<script setup>
import { NSpin, NUpload, createDiscreteApi } from 'naive-ui'
import { useUploadConfig } from '@/apis/user'

const { action, headers } = useUploadConfig()
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: {}
  }
})
const emits = defineEmits(['update:modelValue'])

const fileList = ref([])

const initFileList = () => {
  fileList.value = props.modelValue ? [
    {
      id: props.modelValue,
      name: props.modelValue,
      status: 'finish',
      url: props.modelValue
    }
  ] : []
}
const updateModelValue = () => {
  const urls = []
  fileList.value.forEach(item => {
    if (item.status === 'finished' && item.url) {
      urls.push(item.url)
    }
  })

  emits('update:modelValue', urls[0] || '')
}
const handleSuccess = (...e) => {
  const { file, event } = e[0]
  const response = JSON.parse(event.target.response)
  file.url = response.data
  return file
}
const handleFailure = () => {
  const { message } = createDiscreteApi(['message'])
  message.error('上傳失敗')
}
const watchFileList = watch(
  () => fileList,
  (val) => updateModelValue(),
  { deep: true }
)

initFileList()

onBeforeUnmount(() => {
  watchFileList()
})

</script>
<template>
  <div class="w-full">
    <ClientOnly>
      <template #fallback>
        <div class="border rounded bg-gray-50 flex items-center justify-center w-[94px] h-[94px]">
          <NSpin show />
        </div>
      </template>
      <NUpload
        accept="image/png,image/jpeg,image/gif"
        action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
        :headers="headers"
        v-model:file-list="fileList"
        name="file"
        :data="data"
        list-type="image-card"
        :max="1"
        :on-error="handleFailure"
        :on-finish="handleSuccess"
        :multiple="false"
      />
    </ClientOnly>
  </div>
</template>
