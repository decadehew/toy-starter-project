<script setup>
const ap = ref(null)
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  cover: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  ap.value = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [
      {
        name: props.title,
        artist: '測試',
        url: props.url,
        cover: props.cover
      }
    ]
  })
})

onBeforeUnmount(() => ap.value.destroy())
</script>
<template>
  <div id="aplayer"></div>
</template>
