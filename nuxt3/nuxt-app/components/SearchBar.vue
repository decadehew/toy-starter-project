<script setup>
import { NDrawer, NDrawerContent, NInputGroup, NButton, NInput } from 'naive-ui'

const keyword = ref('')
const drawer = ref(false)

const onOpenHandler = () => {
  drawer.value = true
  keyword.value = ''
}
const onCloseHandler = () => {
  drawer.value = false
}
const enterKeydownHandler = (e) => {
  document.addEventListener('keydown', keyEventHandler)
}
const leaveKeydownHandler = (e) => {
  document.removeEventListener('keydown', keyEventHandler)
}

const onSearchHandler = () => {
  // https://v3.nuxtjs.org/api/utils/navigate-to#navigating-within-a-vue-component
  // router 封裝
  navigateTo({
    name: 'search-type-page', // 指向路由組件名稱
    params: {
      type: 'course',
      page: 1
    },
    query: {
      keyword: keyword.value
    }
  })

  setTimeout(() => {
    onCloseHandler()
  }, 200);
}

const keyEventHandler = (e) => {
  if (e.code === 'Enter' && keyword.value) {
    onSearchHandler()
  }
}

defineExpose({
  onOpenHandler
})

</script>
<template>
  <n-drawer
    v-model:show="drawer"
    default-height="200"
    placement="top"
    :on-after-enter="enterKeydownHandler"
    :on-after-leave="leaveKeydownHandler"
  >
    <n-drawer-content class="flex justify-center items-center">
      <n-input-group class="h-full flex justify-center items-center">
        <n-button type="primary" size="large">想要找什麼</n-button>
        <n-input
          v-model:value="keyword"
          placeholder="寫什麼啊！！！"
          :style="{ width: '500px' }"
          size="large"
        />
        <n-button type="primary" size="large" ghost :disabled="!keyword" @click="onSearchHandler">搜尋</n-button>
      </n-input-group>
    </n-drawer-content>
  </n-drawer>
</template>
