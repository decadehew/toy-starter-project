<script setup>
import { NIcon } from 'naive-ui'
import { CaretUpOutline } from '@vicons/ionicons5'

const btnShow = ref(false)
let timer = null

const backtoTop = () => {
  timer = setInterval(() => {
    let backtop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
    let speedTop = backtop / 15

    document.documentElement.scrollTop = backtop - speedTop

    if (backtop == 0) {
      clearInterval(timer)
    }
  }, 10)
}

onMounted(() => {
  window.addEventListener('scroll', function () {
    const height = document.documentElement.clientHeight || document.body.clientHeight
    const scroll = document.documentElement.scrollTop

    btnShow.value = scroll >= height * 0.618
  })
})

</script>
<template>
  <div class="to-top cursor-pointer" v-if="btnShow">
    <n-icon class="scaleBig" size="40">
      <CaretUpOutline @click="backtoTop" />
    </n-icon>
  </div>
</template>
<style lang="scss" scoped>
.to-top {
  position: fixed;
  right: 20px;
  bottom: 50px;
  z-index: 2;
  border: 2px solid #333333;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out .5s;
  overflow: hidden;
  &-img {
    width: 25px;
    height: 25px;
  }
}
.scaleBig {
  transition: transform 0.5s ease;
}
.scaleBig:hover {
  animation: hover_scale 1.5s ease-in-out infinite;
}
@keyframes hover_scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
