<script setup></script>
<template>
  <div class="tab">
    <slot />
  </div>
</template>
<style>
.tab {
  @apply w-full flex overflow-x-auto bg-white rounded mb-4 ;
}
</style>
