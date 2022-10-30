<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NButton,
  createDiscreteApi
} from 'naive-ui'
import { useForgetApi } from '@/apis/user'

useHead({ title: '忘記密碼' })
definePageMeta({
  title: '忘記密碼',
  layout: 'login',
  middleware: ['visitor']
})

const router = useRouter()
const formRef = ref(null)
const form = reactive({
  phone: '',
  code: '',
  password: '',
  repassword: ''
})
const rules = {
  phone: [
    {
      required: true,
      message: '手機號必填'
    }
  ],
  code: [
    {
      required: true,
      message: '請輸入驗證碼'
    }
  ],
  password: [
    {
      required: true,
      message: '密碼必填'
    }
  ],
  repassword: [
    {
      required: true,
      message: '確認密碼必填'
    },
    {
      validator (rule, value) {
        return value === form.password
      },
      message: '密碼不一致',
      trigger: ['input', 'blur']
    }
  ]
}
const loading = ref(false)
const handleSubmit = () => {
  formRef.value.validate(async (formError) => {
    if (formError) return

    loading.value = true
    const { data, error } = await useForgetApi(form)
    loading.value = false
    if (error.value) return

    const { message } = createDiscreteApi(['message'])
    message.success('重置密碼成功')
    router.go(-1)
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
    <n-form-item :show-label="false" path="password">
      <n-input type="password" v-model:value="form.password" placeholder="請輸入密碼" clearable />
    </n-form-item>
    <n-form-item :show-label="false" path="repassword">
      <n-input type="password" v-model:value="form.repassword" placeholder="請輸入確認密碼" :disabled="!form.password" clearable />
    </n-form-item>
    <div class="flex justify-between w-full mb-2">
      <n-button quaternary type="primary" size="tiny" @click="$router.go(-1)">登入</n-button>
    </div>
    <div>
      <n-button class="w-full" type="primary" @click="handleSubmit" :loading="loading">Reset Password</n-button>
    </div>
  </n-form>
</template>
