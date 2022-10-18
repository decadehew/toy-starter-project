<script setup>
const route = useRoute()
console.log('rrrr')
</script>
<template>
  <div>前端咖啡社區{{$route.params.bbs_id}}~{{$route.params.page}}</div>
  <p>{{$route.name}}</p>
</template>