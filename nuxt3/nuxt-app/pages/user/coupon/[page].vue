<script setup>
import { NPagination, NGrid, NGridItem } from 'naive-ui'
import { useUserCouponApi } from '@/apis/user'

useHead({ title: '優惠券' })

const queryCallbackFn = async ({ page, limit }) => {
  const data = await useUserCouponApi(page, limit)
  return data
}

const {
  page,
  limit,
  pending,
  error,
  rows,
  total,
  paginatePageHandler
} = await usePaginatePage(queryCallbackFn)

</script>
<template>
  <loading-group :pending="pending" :error="error" :is-empty="rows.length === 0">
    <div class="p-3">
      <n-grid :x-gap="20" :y-gap="5" :cols="2">
        <n-grid-item
          v-for="item in rows"
          :key="item"
        >
          <UserCouponList :item="item" />
        </n-grid-item>
      </n-grid>
    </div>
    <div class="flex justify-center items-center mt-5 !pb-[1.5rem]">
      <NPagination
        :size="large"
        :item-count="total"
        :page="page"
        :page-size="limit"
        :on-update:page="paginatePageHandler"
      />
    </div>
  </loading-group>
</template>
