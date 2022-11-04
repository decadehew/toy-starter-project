<script setup>
import { NForm, NFormItem, NInput, NButton, createDiscreteApi } from 'naive-ui'
import { useUpdateUserPasswordApi } from '@/apis/user'

useHead({ title: '修改密碼' })
definePageMeta({
  title: '修改密碼'
})

const router = useRouter()
const formRef = ref(null)
const form = reactive({
  opassword: '',
  password: '',
  repassword: ''
})
const rules = {
  opassword: [
    {
      required: true,
      message: '舊密碼必填',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '新密碼必填',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '確認密碼必填',
      trigger: 'blur'
    },
    {
      validator (rule, value) {
        return value === form.password
      },
      message: '兩次密碼輸入不一致',
      trigger: ['input', 'blur']
    }
  ]
}
const loading = ref(false)
const handleSubmit = () => {
  formRef.value.validate(async (formError) => {
    const { message } = createDiscreteApi(['message'])

    if (formError) {
      message.error('未完成必填')
      return
    }

    loading.value = true
    const { data, error } = await useUpdateUserPasswordApi(form)
    loading.value = false
    if (error.value) return
    message.success('修改密碼成功')
    await useLogout()
  })
}

useEnterEvent(() => handleSubmit())

</script>
<template>
  <div class="p-5">
    <n-form ref="formRef" :model="form" :rules="rules" label-width="80">
      <n-form-item label="原密碼" path="opassword">
        <n-input type="password" v-model:value="form.opassword" placeholder="原密碼" />
      </n-form-item>
      <n-form-item label="新密碼" path="password">
        <n-input type="password" v-model:value="form.password" placeholder="新密碼" />
      </n-form-item>
      <n-form-item label="確認新密碼" path="repassword">
        <n-input
          type="password"
          v-model:value="form.repassword"
          placeholder="確認新密碼"
          :disabled="!form.password"
        />
      </n-form-item>
      <div class="flex justify-end">
        <n-button type="primary" :loading="loading" @click="handleSubmit">發送</n-button>
      </div>
    </n-form>
  </div>
</template>
