<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, provide } from 'vue'
import Challenges2 from './components/2.vue'
// import Challenges10 from './components/10.vue'
// import Challenges11 from './components/11.vue'
// import Challenges27 from './components/27.vue'

// const visible = ref(true)
// const timer = ref(null)
// const count = ref(0)
// provide('timer', timer)
// provide('count', count)

// const toggle = () => {
//   visible.value = !visible.value
// }

</script>

<template>
  <Challenges2 />
  <!-- <div>
    <Challenges10 v-if="visible" />
    <p>
      <button @click="toggle">
        Toggle Child Component
      </button>
    </p>
  </div> -->
  <!-- <Challenges11 /> -->
  <!-- <Challenges27 /> -->
</template>

<style scoped>
</style>
