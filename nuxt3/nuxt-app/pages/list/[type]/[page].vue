<script setup>
const route = useRoute()
</script>
<template>
  <div>公共列表{{ $route.params.bbs_id }}~{{ $route.params.page }}</div>
</template>