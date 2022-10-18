<script setup>
definePageMeta({
  middleware: ['search']
})

const route = useRoute()
const title = ref(route.query.keyword || '')
useHead({ title })
const type = ref(route.params.type)
const tabs = [
  {
    label: '課程',
    value: 'course'
  },
  {
    label: '專欄',
    value: 'column'
  }
]
const handleClick = (type) => {
  navigateTo({
    params: {
      ...route.params,
      type
    },
    query: {
      ...route.query
    }
  })
}
</script>
<template>
  <div>
    <h4 class="text-lg my-3">
      <strong class="text-orang-400">{{title}}</strong>的搜尋結果：
    </h4>
    <ui-tab>
      <ui-tab-item
        v-for="item in tabs"
        :key="item.value"
        :active="type === item.value"
        @click="() => handleClick(item.value)"
      >
        {{item.label}}
      </ui-tab-item>
    </ui-tab>
  </div>
</template>
