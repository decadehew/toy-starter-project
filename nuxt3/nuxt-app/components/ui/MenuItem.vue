<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="menu-item" :class="{ 'menu-item-active': active }">
    <slot/> 
  </div>
</template>
<style>
.menu-item {
  transition: all .2s;
  @apply px-2 py-1 mx-1 rounded cursor-pointer hover:(bg-blue-50 text-blue-700) !active:(bg-blue-100);
}
.menu-item-active {
  @apply !bg-blue-100 !text-blue-600;
}
</style>
