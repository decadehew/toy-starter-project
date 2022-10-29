<script setup>
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  objectFit: {
    type: String,
    default: 'cover'
  }
})
const handlerImageError = () => {
  const imgPath = '/error.png'
  const imgUrl = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  e.target.src = imgPath ? imgPath : imgUrl
}
</script>
<template>
  <img
    :src="src"
    :style="{ 'object-fit': objectFit }"
    :alt="圖片"
    v-bind="$attrs"
    @error="handleImageError"
  />
</template>
