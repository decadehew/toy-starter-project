<script setup>
import { NGrid, NGridItem } from 'naive-ui'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const pageKey = computed(() => route.fullPath)
const MENUS = [
  {
    title: '學習紀錄',
    name: 'user-history-page'
  },
  {
    title: '購買紀錄',
    name: 'user-buy-page'
  },
  {
    title: '我的考試',
    name: 'user-test-page'
  },
  {
    title: '我的帖子',
    name: 'user-post-page'
  },
  {
    title: '優惠券紀錄',
    name: 'user-coupon-page'
  },
  {
    title: '我的收藏',
    name: 'user-fave-page'
  },
  {
    title: '修改資料',
    name: 'user-edit'
  },
  {
    title: '修改密碼',
    name: 'user-password'
  },
  {
    title: '其他設定',
    name: 'user-other'
  }
]

const activeName = computed(() => route.name)
const navigate = (item) => {
  if (item) {
    navigateTo({
      name: item.name,
      params: {
        page: 1
      }
    })
  }
}
</script>
<template>
  <n-grid :x-gap="20">
    <n-grid-item :span="5">
      <ul class="center-menu">
        <li
          v-for="item in MENUS"
          :key="item.title"
          :class="{ active: (item.name === activeName) }"
          @click="() => navigate(item)"
        >{{item.title}}</li>
      </ul>
    </n-grid-item>
    <n-grid-item :span="19">
      <div class="bg-white rounded mb-5 min-h-[66vh]">
        <NuxtPage :page-key="pageKey" />
      </div>
    </n-grid-item>
  </n-grid>
</template>
<style scoped>
.center-menu {
  @apply list-none bg-white rounded;
}
.center-menu li {
  @apply px-5 py-3 text-sm cursor-pointer hover: (bg-blue-50);
}
.center-menu .active {
  @apply font-bold text-white bg-indigo-500;
}
</style>
