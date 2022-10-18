<script setup>
const FOOTER_LINKS = [
  {
    name: '測試1',
    url: '#'
  },
  {
    name: '測試2',
    url: '#'
  },
  {
    name: '測試3',
    url: '#'
  },
  {
    name: '測試4',
    url: '#'
  },
  {
    name: '測試5',
    url: '#'
  }
]
</script>
<template>
  <div class="mt-auto bg-dark-400 text-light-500">
    <div class="flex items-center justify-center py-4">
      <a
        v-for="item in FOOTER_LINKS"
        :key="item.name"
        :href="item.url"
        class="p-3"
      >{{item.name}}</a>
    </div>
    <div class="container mx-auto border-t border-gray-600 flex items-center justify-center !py-4">
      <small>Copyright© 2022</small>
    </div>
  </div>
</template>
