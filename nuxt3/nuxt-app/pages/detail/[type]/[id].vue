<script setup>
import { NGrid, NGridItem, NImage, NButton } from 'naive-ui'
import { useCourseDetailApi } from '@/apis/course'

const route = useRoute()
const { id, type } = route.params
const { data, error, pending, refresh } = await useCourseDetailApi({ id })

const title = computed(() => !pending.value ? data.value?.title : '詳細頁面')
useHead({ title })

const typeObj = {
  media: '圖文',
  video: '視頻',
  audio: '音頻'
}

const subTitle = computed(() => {
  let pre = ''
  if (type === 'course') {
    pre = `[${typeObj[data.value.type]}]`
  }

  return `${pre}${data.value.sub_count} 人學過`
})

</script>
<template>
  <loading-group :pending="pending" :error="error">
    <section class="detail-top">
      <NImage
        class="image"
        object-fit="cover"
        :src="data.cover"
      />
      <div class="info">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <span class="text-xl mr-2">{{data.title}}</span>
          </div>
          <p class="my-2 text-sm text-gray-400">{{subTitle}}</p>
          <div if="!data.isbuy">
            <Price :value="data.price" class="text-xl" />
            <Price :value="data.t_price" through class="text-sm ml-1" />
          </div>
        </div>
        <div class="mt-auto" v-if="!data.isbuy">
          <n-button type="primary" @click="">學習啦</n-button>
        </div>
      </div>
    </section>
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <section class="detail-bottom">
          <ui-tab>
            <ui-tab-item active>詳細</ui-tab-item>
            <div class="content" v-html="(data.type === 'media' && data.isbuy) ? data.content : data.try"></div>
          </ui-tab>
        </section>
      </n-grid-item>
      <n-grid-item :span="6">
        <HotCourseList />
      </n-grid-item>
    </n-grid>
  </loading-group>
</template>
<style scoped>
.detail-top {
  @apply rounded bg-white flex p-5 my-2
}
.detail-top .image {
  @apply rounded w-[340px] h-[210px] mr-5
}
.detail-top .info {
  @apply flex flex-1 flex-col py-2
}
.detail-bottom {
  @apply bg-white shadow-white mb-5 rounded
}
.content {
  @apply p-4
}
.content img {
  max-width: 100% !important;
}
</style>
