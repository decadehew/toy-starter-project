<script setup>
const player = ref(null)
const props = defineProps({
  url: {
    type: String, 
    default: ''
  }
})

onMounted(() => {
  player.value = new Player({
    id: 'mse',
    url: props.url,
    with: null,
    height: 450,
    playsinline: true
  })
})

onBeforeUnmount(() => {
  player.value.destroy()
})
</script>
<template>
  <div id="mse" class="video"></div>
</template>
<style scoped>
.video{
  @apply !w-[1110px]
}
</style>
