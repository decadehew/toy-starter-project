<script setup>
import { NButton, NCard, NTime, createDiscreteApi } from 'naive-ui'
import { useUserReceiveCouponApi } from '@/apis/user'

const typeObj = {
  course: '課程',
  column: '專欄'
}

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})
const isLoading = ref(false)
const getCoupon = ref(props.item.isgetcoupon)

const handleSubmit = () => {
  const { message } = createDiscreteApi(['message'])
  if (getCoupon.value) {
    message.error('您已經領取過了')
    return
  }

  useHasAuth(async () => {
    isLoading.value = true
    const { data, error } = await useUserReceiveCouponApi({ coupon_id: props.item.id })
    isLoading.value = false

    if (error.value) return
    message.success('領取成功')
    getCoupon.value = true
  })
}

</script>
<template>
  <n-card class="coupon" :class="{'coupon-disabled': getCoupon}">
    <h4>{{item.price}}</h4>
    <p>適用 {{typeObj[item.type]}} : {{item.value.title}}</p>
    <p class="!text-xs mt-3">
      有效期：
      <NTime :time="new Date(item.start_time)" />
      ~
      <NTime :time="new Date(item.end_time)" />
    </p>
    <template #footer>
      <div class="flex justify-end">
        <n-button
          size="small"
          :type="getCoupon ? '' : 'warning'"
          :disabled="getCoupon"
          :loading="isLoading"
          @click="handleSubmit"
        >{{getCoupon ? '已領取' : '立即領取'}}</n-button>
      </div>
    </template>
  </n-card>
</template>
<style scoped>
.coupon {
  @apply mb-5 !bg-orange-500 !border-0;
}
.coupon h4 {
  @apply text-2xl mb-2 font-bold text-white;
}
.coupon p {
  @apply text-sm text-light-300;
}
.coupon-disabled {
  @apply !bg-gray-300;
}
</style>
