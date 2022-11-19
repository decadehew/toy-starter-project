<script setup>
import { NGridItem, NGrid, NSkeleton } from 'naive-ui'

</script>
<template>
  <n-grid :x-gap="20" :cols="2">
    <n-grid-item v-for="i in 2" :key="i">
      <section class="flex p-5 items-stretch mb-5 bg-white shadow rounded">
        <n-skeleton width="108px" height="138px" class="rounded flex-shrink-0" />
        <div class="flex flex-col pl-3 flex-1">
          <n-skeleton width="50%" height="15px" class="my-2" />
          <n-skeleton width="50%" height="15px" class="my-2" />
          <n-skeleton width="50%" height="15px" class="my-2" />
          <div class="mt-auto flex items-center">
            <div class="flex items-end">
              <n-skeleton width="30px" text />
              <n-skeleton width="30px" class="mx-2" />
            </div>
            <n-skeleton width="100px" round size="medium" class="al-auto" />
          </div>
        </div>
      </section>
    </n-grid-item>
  </n-grid>
</template>
