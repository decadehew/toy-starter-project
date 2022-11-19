<script setup>
import { NGrid, NGridItem, NImage, NButton, createDiscreteApi } from 'naive-ui'
import { useOrderLearnApi } from '@/apis/course'
import { useProductDetailApi } from '@/apis/common'

const route = useRoute()
const { id, type } = route.params
const isLoading = ref(false)
const useRequestQuery = () => {
  const { column_id } = route.query
  const query = { id }
  if (column_id) {
    query.column_id = column_id
  }

  return query
}
const query = useRequestQuery()
const { data, error, pending, refresh } = await useProductDetailApi(type, query)

const title = computed(() => !pending.value ? data.value?.title : '詳細頁')
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

if (type === 'course') {
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css'
      }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js' },
      { src: '//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js' }
    ]
  })
}

// 是否購買或進入學習
const handleForLearner = (item) => {
  useHasAuth(() => {
    const { message } = createDiscreteApi(['message'])
    if (type === 'column' && item.price != 0 && !data.value.isbuy) {
      return message.error('來購買喔')
    }

    let path = ''
    if (type === 'column') {
      path = `/detail/course/${item.id}?column_id=${data.value.id}`
    } else if (type === 'book') {
      path = `/book/${data.value.id}/${item.id}`
    }

    navigateTo(path)
  })
}

const { tabs, tabState, changeTabHandler } = initProductDetailTabs(type)

const menus = computed(() => {
  return (type === 'book' ? data.value.book_details : data.value.column_courses) || []
})

const freeID = computed(() => {
  let fid = 0
  if (type === 'book' && data.value) {
    const item = data.value.book_details.find(o => o.isfree == 1)
    if (item) {
      fid = item.id
    }
  }

  return fid
})

const isMediaView = computed(() => {
  return data.value.isbuy && (data.value.type !== 'media' && type === 'course')
})

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
    <section class="py-4" v-if="isMediaView">
      <ClientOnly>
        <template #fallback>
          <LoadingSkeleton />
        </template>
        <PlayerAudio
          :title="data.title"
          :cover="data.cover"
          :url="data.content"
          v-if="data.type === 'audio'"
        />
        <PlayerVideo :url="data.content" v-else-if="data.type === 'video'" />
      </ClientOnly>
    </section>
    <section class="detail-top" v-else>
      <NImage
        class="image"
        :class="{'book-image': type === 'book'}"
        object-fit="cover"
        :src="data.cover"
      />
      <div class="info">
        <div class="flex flex-col items-start">
          <div class="flex items-center">
            <span class="text-xl mr-2">{{data.title}}</span>
            <FaveBtn :isFave="data.isfava" :goods_id="data.id" :type="type" />
          </div>
          <p class="my-2 text-sm text-gray-400 ml-[0.1rem]">{{subTitle}}</p>
          <CouponModal />
          <div if="!data.isbuy">
            <Price :value="data.price" class="text-xl" />
            <Price :value="data.t_price" through class="text-sm ml-1" />
          </div>
        </div>
        <div class="mt-auto" v-if="!data.isbuy">
          <template v-if="type === 'book'">
            <template v-if="menus.length">
              <n-button type="primary" @click="handleBuy" :loading="isLoading">學習啦</n-button>
              <n-button
                type="info"
                strong
                secondary
                class="ml-2"
                @click="() => handleForLearner({ id: freeID })"
                :loading="isLoading"
                v-if="freeID"
              >免費試看</n-button>
            </template>
            <n-button type="error" disabled v-else>敬請期待</n-button>
          </template>
          <n-button
            type="primary"
            @click="handleBuy"
            :loading="isLoading"
            v-else
          >學習啦</n-button>
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
          <detail-menu v-else>
            <detail-menu-item
              v-for="(item, index) in menus"
              :key="index"
              :index="index"
              :item="item"
              @click="() => handleForLearner(item)"
            ></detail-menu-item>
            <Empty v-if="menus.length == 0" desc="無資料" />
          </detail-menu>
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
.detail-top .book-image{
  @apply rounded w-[130px] h-[180px] mr-8 ml-3
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
