<script setup>
import { NGrid, NGridItem, NCard, NSkeleton } from 'naive-ui'
</script>
<template>
  <n-grid :x-gap="20" :y-gap="5" :cols="4">
    <n-grid-item v-for="i in 8" :key="i">
      <n-card class="mb-5">
        <template #cover>
          <NSkeleton height="150px" width="100%" />
        </template>
        <NSkeleton height="15px" width="50%" class="my-2" />
        <NSkeleton text style="width: 60%" />
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
