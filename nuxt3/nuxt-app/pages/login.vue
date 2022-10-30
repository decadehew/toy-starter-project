<script setup>
import {
  NForm,
  NInput,
  NFormItem,
  NButton,
  createDiscreteApi
} from 'naive-ui'
import { useRegisterApi, useLoginApi } from '@/apis/user'

const route = useRoute()
const type = ref('login')
const title = ref('登入')

useHead({ title })
definePageMeta({
  layout: 'login',
  middleware: ['visitor']
})

const loading = ref(false)
const formRef = ref(null)
const form = reactive({
  name: '',
  password: type.value === 'login' ? '123456' : '',
  repassword: ''
})
const rules = computed(() => {
  const rulesObj = {
    username: [
      {
        required: true,
        message: type.value === 'login' ? '請輸入使用者名稱/手機/郵箱' : '請輸入使用名稱',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '請輸入密碼',
        trigger: 'blur'
      }
    ]
  }

  if (type.value !== 'login') {
    rulesObj.repassword = [
      {
        required: true,
        message: '請輸入確認密碼'
      },
      {
        validator: (rule, value, callback) => {
          if (value !== form.password) {
            callback(new Error('兩次密碼不一致'))
          } else {
            callback()
          }
        },
        trigger: ['blur', 'input']
      }
    ]
  }

  return rulesObj
})
const changeType = () => {
  type.value = type.value === 'login' ? 'register' : 'login'
  title.value = type.value === 'login' ? '登 入' : '註 冊'
  route.meta.title = title.value

  form.username = type.value === 'login' ? 'fe-test' : ''
  form.password = type.value === 'login' ? '123456' : ''
  form.repassword = ''
  formRef.value.restoreValidation()
}
const handleSubmit = () => {
  formRef.value.validate(async (formError) => {
    if (formError) return

    loading.value = true
    const { data, error } = type.value === 'login' ? await useLoginApi(form) : useRegisterApi(form)
    loading.value = false
    if (error.value) return

    const { message } = createDiscreteApi(['message'])
    const msgText = type.value === 'login' ? '登入成功' : '註冊成功' 
    message.success(msgText)

    if (type.value === 'login') {
      const token = useCookie('token')
      token.value = data.value.token

      const user = useUser()
      user.value = data.value

      navigateTo(route.query.from || '/', { replace: true })
    } else {
      changeType()
    }
  })
}

useEnterEvent(() => handleSubmit())
</script>
<template>
  <n-form class="w-[340px]" :model="form" ref="formRef" :rules="rules" size="large">
    <n-form-item :show-label="false" path="username">
      <n-input v-model:value="form.username" :placeholder="type === 'login' ? '使用者名稱/手機/郵箱' : '使用者名稱'" clearable />
    </n-form-item>
    <n-form-item :show-label="false" path="password">
      <n-input type="password" v-model:value="form.password" placeholder="輸入密碼" clearable />
    </n-form-item>
    <n-form-item v-if="type !== 'login'" :show-label="false" path="repassword">
      <n-input type="password" v-model:value="form.repassword" placeholder="確認密碼" clearable />
    </n-form-item>
    <div>
      <div class="w-full flex justify-between mb-2">
        <n-button quaternary type="primary" size="tiny" @click="changeType" :loading="loading">
          {{type === 'login' ? '註 冊' : '登 入'}}
        </n-button>
        <nuxt-link to="/forget" class="text-primary">
          <n-button quaternary type="primary" size="tiny">忘記密碼</n-button>
        </nuxt-link>
      </div>
      <n-button class="w-full" type="primary" @click="handleSubmit">
        {{type === 'login' ? '登 入' : '註 冊'}}
      </n-button>
      <div class="flex text-xs w-full justify-center items-center mt-5 text-warm-gray-600">
        註冊即同意
        <n-button quaternary type="primary" size="tiny">【服務協議】</n-button>
        <n-button quaternary type="primary" size="tiny">【隱私政策】</n-button>
      </div>
    </div>
  </n-form>
</template>
