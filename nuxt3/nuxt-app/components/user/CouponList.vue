<script setup>
import { NButton, NCard } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})

const btn = computed(() => {
  props.item.expires = (new Date(props.item.end_time)).getTime() < (new Date()).getTime()
  return {
    isDisabled: !!props.item.used || props.item.expires,
    text: props.item.used ? '已使用' : (props.item.expires ? '已過期' : '立即使用')
  }
})

const state = reactive({
  course: '課程',
  column: '專欄'
})

const handleClick = () => {
  navigateTo(`/createorder?id=${props.item.goods_id}&type=${props.item.type}`)
}

</script>
<template>
  <n-card class="coupon" :class="{'coupon-disabled': btn.isDisabled}">
    <h4>{{item.price}}</h4>
    <p>適用 {{state[item.type]}}：{{item.title}}</p>
    <p class="!text-xs mt-3">有效期：{{item.start_time}} - {{item.end_time}}</p>
    <template #footer>
      <div class="flex justify-end">
        <n-button
          :type="btn.isDisabled ? 'tertiary' : 'warning'"
          :disabled="btn.isDisabled"
          @click="handleClick">{{btn.text}}</n-button>
      </div>
    </template>
  </n-card>
</template>
<style scoped>
.coupon {
  @apply mb-5 bg-orange-500 !border-0;
}
.coupon h4 {
  @apply text-2xl mb-2 font-bold text-white;
}
.coupon p {
  @apply text-sm text-light-300;
}
.coupon-disabled {
  @apply  !bg-gray-300;
}
</style>
