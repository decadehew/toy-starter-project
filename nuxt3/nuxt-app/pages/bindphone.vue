<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NButton,
  createDiscreteApi
} from 'naive-ui'
import { useBindPhoneApi } from '@/apis/user'

useHead({ title: '綁定手機號' })
definePageMeta({
  title: '手機綁定',
  layout: 'login'
})

const route = useRoute()
const formRef = ref(null)
const form = reactive({
  phone: '',
  code: ''
})
const rules = {
  phone: [
    {
      required: true,
      message: '手機號必填',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '請輸入驗證碼',
      trigger: 'blur'
    }
  ]
}
const loading = ref(false)
const handleSubmit = () => {
  formRef.value.validate(async (formError) => {
    if (formError) return

    loading.value = true
    const { data, error } = await useBindPhoneApi(form)
    loading.value = false
    if (error.value) return

    const { message } = createDiscreteApi(['message'])
    message.success('綁定成功')
    navigateTo(route.query.from || '/', { replace: true })
  })
}

useEnterEvent(() => handleSubmit())
</script>
<template>
  <n-form class="w-[340px]" ref="formRef" :model="form" :rules="rules" size="large">
    <n-form-item :show-label="false" path="phone">
      <n-input v-model:value="form.phone" placeholder="請輸入手機號" clearable />
    </n-form-item>
    <n-form-item :show-label="false" path="code">
      <n-input-group>
        <n-input v-model:value="form.code" placeholder="請輸入 6 位驗證碼" :style="{ width: '75%' }" />
        <SendCode :phone="form.phone" />
      </n-input-group>
    </n-form-item>
    <div>
      <n-button class="w-full" type="primary" @click="handleSubmit" :loading="loading">綁定</n-button>
    </div>
  </n-form>
</template>
