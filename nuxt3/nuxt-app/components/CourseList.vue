<script setup>
import { NCard } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})
</script>
<template>
  <n-card class="cursor-pointer mb-5 shadow-md !border-0" footer-style="padding:0;">
    <template #cover>
      <!-- 這裡會導致圖片錯誤 -->
      <UiImage v-if="item?.cover" :src="item.cover" class="w-[100%] h-[150px]" />
    </template>
    <div class="pt-2">
      <span class="font-bold w-full truncate font-semibold">{{item.title}}</span>
    </div>
    <div class="flex mt-2 items-end">
      <Price :value="item.price" />
      <Price class="ml-2" :value="item.t_price" through />
    </div>
    <template #footer v-if="item.group_id || item.flashsale_id">
      <ClientOnly>
        <div class="flex items-center p-3 bg-yellow-400 text-white text-xs rounded-b">
          {{item.group_id ? '拼團中' : '秒殺中'}}
          <div class="ml-auto flex items-center">
            倒數中 <Seckill :time="item?.end_time" />
          </div>
        </div>
      </ClientOnly>
    </template>
  </n-card>
</template>