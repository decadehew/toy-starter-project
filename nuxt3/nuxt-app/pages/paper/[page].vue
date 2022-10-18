<script setup>
const route = useRoute()
</script>
<template>
  <div>考試列表{{$route.params.page}}</div>
  <p>{{$route.name}}</p>
</template>
