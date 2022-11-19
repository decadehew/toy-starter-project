<script setup>
import { NButton } from 'naive-ui'

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})

const handleOpen = () => {
  navigateTo(`/detail/book/${props.item.id}`)
}
</script>
<template>
  <section class="flex p-5 items-stretch mb-5 bg-white shadow rounded">
    <UiImage
      class="w-[138px] rounded flex-shrink-0 bg-gray-50"
      :src="item.cover"
      v-if="item?.cover"
    />
    <div class="flex flex-col pl-3 flex-1">
      <h4>{{item.title}}</h4>
      <div class="mt-auto flex items-center">
        <div class="flex items-end">
          <Price :value="item.price" />
          <Price :value="item.t_price" through class="ml-2" />
        </div>
        <n-button
          strong
          secondary
          round
          type="primary"
          class="ml-auto"
          @click="handleOpen"
        >
          {{item.sub_count == 0 ? '立即訂閱' : (item.sub_count) + '人訂閱'}}
        </n-button>
      </div>
    </div>
  </section>
</template>
