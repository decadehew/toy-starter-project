<script setup>
import { NCard, NSkeleton } from 'naive-ui'
</script>
<template>
  <n-card class="mb-5" v-for="i in 4" :key="i">
    <n-skeleton text style="width: 30%;"></n-skeleton>
    <n-skeleton text :repeat="2"></n-skeleton>
    <n-skeleton text style="width: 45%;"></n-skeleton>
    <n-skeleton text style="width: 60%;"></n-skeleton>
  </n-card>
</template>
