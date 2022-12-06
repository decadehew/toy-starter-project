// Child.vue

<script setup>
import { onMounted, onUnmounted, inject } from 'vue'

const timer = inject('timer')
const count = inject('count')


onMounted(() => {
  // 切换子组件时, 定时器将不正常工作, 让我们来修复它 . 
  timer.value = window.setInterval(() => {
    count.value++
  }, 1000)
})

onUnmounted(() => {
  console.log('onUnmounted', timer.value)
  window.clearInterval(timer.value)
})

</script>

<template>
  <div>
    <p>
      Child Component: {{ count }}
    </p>
  </div>
</template>
