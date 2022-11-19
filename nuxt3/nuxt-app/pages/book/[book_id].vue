<script setup>
import { NGrid, NGridItem, NImage, NCard, NScrollbar } from 'naive-ui'
import { useBookMenusApi } from '@/apis/book'

const route = useRoute()
const pageKey = computed(() => route.fullPath)
const { book_id, id } = route.params
const activeId = ref(id)

definePageMeta({
  middleware(to, from) {
    const { book_id } = to.params
    if (isNaN(+book_id)) {
      return abortNavigation('抱歉，頁面不存在')
    }

    return true
  }
})

const { data, error, pending } = await useBookMenusApi(book_id)

const handleOpen = (id) => {
  activeId.value = id
  navigateTo({
    params: {
      ...route.params,
      id
    }
  })
}

</script>
<template>
  <loading-group :pending="pending" :error="error">
    <n-grid :x-gap="20">
      <n-grid-item :span="6">
        <n-scrollbar class="bg-white rounded shadow max-h-[450px] mb-5">
          <div class="flex flex-col items-center justify-center">
            <NImage
              width="60"
              height="80"
              class="rounded shadow my-4"
              :src="data.detail.cover"
            />
            <span class="text-sm font-bold">{{data.detail.title}}</span>
          </div>
          <detail-menu>
            <detail-menu-item
              v-for="(item, index) in data.menus"
              :key="index"
              :index="index"
              :active="activeId === item.id"
              @click="() => handleOpen(item.id)"
            >
              <Empty v-if="!data.menus.length" desc="無資料" />
            </detail-menu-item>
          </detail-menu>
        </n-scrollbar>
      </n-grid-item>
      <n-grid-item :span="18">
        <n-card>
          <NuxtPage :page-key="pageKey" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </loading-group>
</template>
