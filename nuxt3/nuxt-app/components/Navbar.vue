<script setup>
import { NIcon, NButton, NDropdown, NAvatar } from 'naive-ui'
import { Search } from '@vicons/ionicons5'

const route = useRoute()
const userOptions = [
  {
    label: '用户中心',
    key: 'center'
  },
  {
    label: '帳號登出',
    key: 'layout'
  }
]

const MENUS = [
  {
    name: '首頁',
    path: '/'
  },
  {
    name: '考試',
    path: '/paper/1',
    match: [{ name: 'paper-page' }]
  },
  {
    name: '拼團',
    path: '/list/group/1',
    match: [{ name: 'list-type-page', params: { type: 'group' } }]
  },
  {
    name: '秒殺',
    path: '/list/flashsale/1',
    match: [{ name: 'list-type-page', params: { type: 'flashsale' } }]
  },
  {
    name: '直播',
    path: '/list/live/1',
    match: [{ name: 'list-type-page', params: { type: 'live' } }]
  },
  {
    name: '專欄',
    path: '/list/column/1',
    match: [{ name: 'list-type-page', params: { type: 'column' } }]
  },
  {
    name: '電子書',
    path: '/list/book/1',
    match: [{ name: 'list-type-page', params: { type: 'book' } }]
  },
  {
    name: '社區',
    path: '/bbs/0/1',
    match: [{ name: 'bbs-bbs_id-page' }]
  },
  {
    name: '課程',
    path: '/list/course/1',
    match: [{ name: 'list-type-page', params: { type: 'course' } }]
  },
]

const handleOnOpen = (path) => {
  navigateTo(path)
}

const isMenuItemActive = (item) => {
  if (item.match) {
    let i = item.match.findIndex(m => {
      let result = true
      if (m.params && typeof (m.params === 'object')) {
        result = Object.keys(m.params).every(key => {
          return m.params[key] === route.params[key]
        })
      }

      return m.name == route.name && result
    })

    return i != -1
  }

  return route.path == item.path
}

const SearchBarRef = ref(null)
const openSearchBar = () => {
  SearchBarRef.value.onOpenHandler()
}

</script>
<template>
  <div class="navbar">
    <div class="container flex items-center h-[60px]">
      <n-button text class="!text-xl !font-bold">前端咖啡</n-button>
      <ui-menu>
        <ui-menu-item
          v-for="(item, index) in MENUS"
          :key="item.name"
          :active="isMenuItemActive(item)"
          @click="() => handleOnOpen(item.path)"
        >{{item.name}}</ui-menu-item>
      </ui-menu>
      <n-button circle class="ml-auto mr-3" @click="openSearchBar">
        <template #icon>
          <n-icon>
            <Search />
          </n-icon>
        </template>
      </n-button>
      <n-dropdown :options="userOptions">
        <n-avatar round size="medium" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"></n-avatar>
      </n-dropdown>
    </div>
  </div>
  <div class="w-[100%] h-[80px]"></div>
  <SearchBar ref="SearchBarRef" />
</template>
<style>
.navbar {
  z-index: 999;
  @apply bg-white fixed top-0 left-0 right-0 shadow-sm;
}
</style>