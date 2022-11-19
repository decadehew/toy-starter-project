<script setup>
const emit = defineEmits(['start', 'end'])
const props = defineProps({
  time: {
    type: [String, Number],
    default: ''
  }
})

const useFormatTime = (seconds) => {
  let time = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  if (seconds > 0) {
      time.days = Math.floor(seconds / (60 * 60 * 24))
      time.hours = Math.floor(seconds / (60 * 60)) - time.days * 24
      time.minutes = Math.floor(seconds / 60) - time.days * 24 * 60 - time.hours * 60
      time.seconds = Math.floor(seconds) - time.days * 24 * 60 * 60 - time.hours * 60 * 60 - time.minutes * 60
  }

  time.days = time.days < 10 ? "0" + time.days : time.days
  time.hours = time.hours < 10 ? "0" + time.hours : time.hours
  time.minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes
  time.seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds

  return time
}
const useSeckill = (time) => {
  const timeout = ref(0)
  const timer = ref(null)

  function closeTimer () {
    if (timer.value) clearInterval(timer.value)
  }

  if (typeof time === 'string') {
    time = (new Date(time)).getTime()
  }
  timeout.value = (time - Date.now()) / 1000
  if (timeout.value <= 0) {
    return emit('end')
  }

  closeTimer()

  timer.value = setInterval(() => {
    timeout.value--
    if (timeout.value <= 0) {
      closeTimer()
    }
  }, 1000)

  const d = computed(() => useFormatTime(timeout.value))

  return d
}
const data = useSeckill(props.time)

</script>
<template>
  <div class="count-down" v-if="data">
    <small>{{data.days}}</small> 天
    <small>{{data.hours}}</small> :
    <small>{{data.minutes}}</small> :
    <small>{{data.seconds}}</small>
  </div>
</template>
<style>
.count-down small{
  background-color: #fff;
  border-radius: 2px;
  padding: 2px 3px;
  margin:0 3px;
  @apply text-rose-500;
}
</style>
