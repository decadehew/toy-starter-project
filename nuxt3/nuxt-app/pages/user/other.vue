<script setup>
import { NButton } from 'naive-ui'

useHead({ title: '其他設定' })
const user = useUser()

const bindPhoneHandler = () => navigateTo('/bindphone')

</script>
<template>
  <div class="p-5">
    <p class="text-sm text-gray-500">其他設定</p>
    <div class="flex py-5 border-b">
      手機號：<span class="text-blue-500">{{user.phone}}</span>
      <n-button
        type="primary"
        size="small"
        dashed
        class="ml-auto"
        @click="bindPhoneHandler"
      >修改</n-button>
    </div>
  </div>
</template>
