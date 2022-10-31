<script setup>
import { NButton, NResult } from 'naive-ui'

const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: [String, Boolean, Symbol],
    default: false
  },
  isEmpty: {
    type: Boolean,
    default: false
  }
})

const loading = ref(false)
const stop = watchEffect(() => {
  if (props.pending && !loading.value) {
    loading.value = true
  } else {
    setTimeout(() => loading.value = false, 300)
  }
})

onBeforeUnmount(() => {
  stop()
})
</script>
<template>
  <div>
    <template v-if="loading">
      <slot name="loading">
        <!-- 默認 skeleton -->
        <LoadingSkeleton />
      </slot>
    </template>
    <template v-else-if="error">
      <n-result class="mt-10" status="500" title="500 錯誤" :description="error?.data?.data || '抱歉！！！'">
        <template #footer>
          <n-button @click="$router.go(-1)">回到上一頁</n-button>
        </template>
      </n-result>
    </template>
    <template v-else-if="isEmpty">
      <Empty />
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>