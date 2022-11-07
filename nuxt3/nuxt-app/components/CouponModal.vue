<script setup>
import { NButton, NPopover, NScrollbar } from 'naive-ui'
import { useCouponListApi } from '@/apis/common'

const { data } = await useCouponListApi()
</script>
<template>
  <ClientOnly>
    <n-popover :width="450" placement="right" trigger="click">
      <template #trigger>
        <n-button strong secondary type="warning" size="tiny" class="mb-1">領取優惠券</n-button>
      </template>
      <div class="p-2">
        <h4 class="text-lg font-bold mb-3">可用優惠券 ({{data.length}})</h4>
        <n-scrollbar class="h-[420px]">
          <CouponList v-for="item in data" :key="index" :item="item" />
        </n-scrollbar>
      </div>
    </n-popover>
  </ClientOnly>
</template>
