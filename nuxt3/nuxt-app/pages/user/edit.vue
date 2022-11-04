<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NRadio,
  NRadioGroup,
  NButton,
  NUpload,
  NSpace,
  createDiscreteApi
} from 'naive-ui'
import { useUpdateUserInfoApi } from '@/apis/user'

useHead({ title: '編輯資料' })

const user = useUser()
const isLoading = ref(false)
const formRef = ref(null)
const form = reactive({
  avatar: '',
  nickname: '',
  sex: ''
})
const rules = {
  nickname: [
    {
      required: true,
      message: '暱稱必填'
    }
  ],
  sex: [
    {
      required: true,
      message: '性別必選'
    }
  ]
}
const genderOptions = [
  { value: '不知道' },
  { value: '男' },
  { value: '女' },
]

if (user.value) {
  form.avatar = user.value.avatar
  form.nickname = user.value.nickname
  form.sex = user.value.sex
}

const handleSubmit = () => {
  formRef.value.validate(async (errors) => {
    if (errors) return

    isLoading.value = true
    const { data, error } = await useUpdateUserInfoApi(form)
    isLoading.value = false

    if (error.value) return
    const { message } = createDiscreteApi(['message'])
    message.success('修改成功')
    useRefreshUserInfo()
  })
}

</script>
<template>
  <div class="p-5">
    <n-form :model="form" ref="formRef" :rules="rules" label-width="100" label-placement="left">
      <n-form-item label="使用者名稱">
        <n-input v-model:value="user.username" :autosize="false" class="w-1/2" />
      </n-form-item>
      <n-form-item label="頭像" path="avatar" class="ml-[0.8rem]">
        <!-- <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="[]"
          list-type="image-card"
        >上傳</n-upload> -->
        <uploader v-model="form.avatar"/>
      </n-form-item>
      <n-form-item label="暱稱" path="nickname">
        <n-input v-model:value="form.nickname" :autosize="false" class="w-1/2" placeholder="請輸入暱稱" />
      </n-form-item>
      <n-form-item label="性別" path="sex">
        <n-radio-group v-model:value="form.sex" name="gender">
          <n-space>
            <n-radio v-for="item in genderOptions" :key="item.value" :value="item.value">{{item.value}}</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item>
        <n-button class="ml-8" type="primary" @click="handleSubmit" :loading="isLoading">送出</n-button>
      </n-form-item>
    </n-form>
    <slot />
  </div>
</template>
