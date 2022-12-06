<!-- https://cn-vuejs-challenges.netlify.app/questions/11-next-dom-update/README.zh-CN.html -->
<!-- 下一次DOM更新 -->
<script setup>
import { ref, nextTick } from "vue"

const count = ref(0)

async function increment() {
  count.value++

  /**
   * DOM还未更新,如何确保DOM已经更新 ?
   * 请保证以下输出为true
  */

  console.log('DOM not yet updated', document.getElementById('counter').textContent)
  await nextTick()
  console.log('DOM is now updated', document.getElementById("counter").textContent)
}
</script>

<template>
  <button id="counter" @click="increment">
    {{ count }}
  </button>
</template>
