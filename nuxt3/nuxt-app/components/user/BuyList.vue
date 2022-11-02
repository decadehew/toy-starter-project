<script setup>
import { NButton } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})

const state = {
  closed: '課程結束',
  success: '支付成功',
  pending: '等待支付',
  grouping: '拼團中',
  group: '拼團',
  flashsale: '秒殺'
}

const handlePay = () => {
  navigateTo(`/pay?no=${props.item.no}`)
}

</script>
<template>
  <ui-card>
    <ui-card-header class="flex justify-between">
      <span>訂單時間：{{item.created_item}}</span><span>訂單號：{{item.no}}</span>
    </ui-card-header>
    <ui-card-body>{{item.goods}}</ui-card-body>
    <ui-card-footer class="flex">
      <span v-if="item.type !== 'default'">[{{state[item.type]}}]</span>
      <Price :value="item.price" />
      <span class="ml-auto" :class="{'text-green-600': (item.status === 'success')}">狀態：{{state[item.status]}}</span>
      <n-button
        strong
        secondary
        type="warning"
        size="small"
        v-if="item.status === 'pending'"
        @click="handlePay"
      >立即支付</n-button>
    </ui-card-footer>
  </ui-card>
</template>
