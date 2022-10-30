<script setup>
import { NButton, createDiscreteApi } from 'naive-ui'
import { useGetCaptchaApi } from '@/apis/user'

const loading = ref(false)
const props = defineProps(['phone'])
const text = computed(() => {
  if (loading.value) {
    return '發送中...'
  }
  if (time.value > 0) {
    return `${time.value} s`
  }
  return '發送驗證碼'
})

const time = ref(0)
const timer = ref(null)
const sendCode = async () => {
  loading.value = true
  const { data, error } = await useGetCaptchaApi(props.phone)
  loading.value = false

  if (error.value) return

  time.value = 60
  if (timer.value) {
    clearInterval(timer.value)
  }
  timer.value = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timer.value)
    }
  }, 1000)

  const msg = data.value === 'ok' ? '驗證碼發送成功' : `Demo 驗證碼: ${data.value}`
  const { message } = createDiscreteApi(['message'])
  message.success(msg)
}

</script>
<template>
  <n-button type="primary" ghost :disabled="time > 0 || !phone" :loading="loading" @click="sendCode">{{text}}</n-button>
</template>
