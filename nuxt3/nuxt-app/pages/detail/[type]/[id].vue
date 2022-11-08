<script setup>
import { NGrid, NGridItem, NImage, NButton } from 'naive-ui'
import { useOrderLearnApi } from '@/apis/course'
import { useProductDetailApi } from '@/apis/common'

const route = useRoute()
const { id, type } = route.params
const { data, error, pending, refresh } = await useProductDetailApi(type, { id })
const isLoading = ref(false)

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

const initProductDetailTabs = (tab) => {
  const tabs = computed(() => {
    const items = [
      {
        label: '詳情',
        value: 'content'
      }
    ]

    if (tab === 'column' || tab === 'book') {
      items.push({
        label: '目錄',
        value: 'menu'
      })
    }

    return items
  })

  const tabState = ref('content')
  const changeTabHandler = (val) => {
    tabState.value = val
  }

  return { tabs, tabState, changeTabHandler }
}
const { tabs, tabState, changeTabHandler } = initProductDetailTabs(type)

const handleBuy = () => {
  useHasAuth(async () => {
    if (data.value.price == 0) {
      isLoading.value = true
      
      const { error } = await useOrderLearnApi({
        goods_id: data.value.id,
        type: type || data.value.type
      })
      isLoading.value = false

      if (!error.value) {
        refresh()
      }

      return
    }
  })
}

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
            <FaveBtn :isFave="data.isfava" :goods_id="data.id" :type="type" />
          </div>
          <p class="my-2 text-sm text-gray-400">{{subTitle}}</p>
          <CouponModal />
          <div if="!data.isbuy">
            <Price :value="data.price" class="text-xl" />
            <Price :value="data.t_price" through class="text-sm ml-1" />
          </div>
        </div>
        <div class="mt-auto" v-if="!data.isbuy">
          <n-button type="primary" @click="handleBuy" :loading="isLoading">學習啦</n-button>
        </div>
      </div>
    </section>
    <n-grid :x-gap="20">
      <n-grid-item :span="18">
        <section class="detail-bottom">
          <ui-tab class="border-b">
            <ui-tab-item
              v-for="item in tabs"
              :key="item.label"
              :active="tabState === item.value"
              @click="() => changeTabHandler(item.value)"
            >{{item.label}}</ui-tab-item>
          </ui-tab>
          <div
            class="content"
            v-html="(data.type === 'media' && data.isbuy) ? data.content : data.try"
            v-if="tabState === 'content'"
          ></div>
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
</style>
