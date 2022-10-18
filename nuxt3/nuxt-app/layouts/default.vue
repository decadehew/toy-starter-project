<script setup>
</script>
<template>
  <div class="body">
    <Navbar />
    <main class="container">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
<style>
.body {
  min-width: 1000px;
  @apply bg-gray-100 flex flex-col min-h-screen;
}
</style>