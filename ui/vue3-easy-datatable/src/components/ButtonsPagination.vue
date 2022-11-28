<script lang="ts" setup>
import { computed, inject } from 'vue';

type PaginationItem = {
  type: 'button',
  page: number,
  active: boolean
} | {
  type: 'omission'
}

const props = defineProps({
  maxPaginationNumber: {
    type: Number, required: true,
  },
  currentPaginationNumber: {
    type: Number, required: true,
  },
});
const emits = defineEmits(['updatePage']);

// 顯示 button 7 個
const totalVisible = 7;
const rowHeight = inject('rowHeight');
const buttonSizePx = computed(() => `${rowHeight.value * 0.6}px`);
const borderColor = inject('borderColor');
const themeColor = inject('themeColor');

// 自定義事件：點擊觸發當前頁數
const changePage = (item: PaginationItem) => {
  if (item.type === 'button' && !item.active) {
    emits('updatePage', item.page);
  }
};
// 核心：主要 render 頁數邏輯
const paginationItemsForRender = computed((): PaginationItem[] => {
  const paginationItems: PaginationItem[] = [];
  // 假設 maxPaginationNumber：200
  if (props.maxPaginationNumber <= totalVisible) {
    // 如果 200 小於 7，表示 7 筆以下分頁 btn
    for (let i = 1; i <= props.maxPaginationNumber; i += 1) {
      paginationItems.push({
        type: 'button',
        page: i,
        active: i === props.currentPaginationNumber,
      });
    }
  } else if ([1, 2, props.maxPaginationNumber, props.maxPaginationNumber - 1].includes(props.currentPaginationNumber)) {
    // 如果當前頁數是 [1,2,200,199] 其中一個數值
    for (let i = 1; i <= totalVisible; i += 1) {
      if (i <= 3) {
        // 顯示 3 個分頁 btn
        paginationItems.push({
          type: 'button',
          page: i,
          active: i === props.currentPaginationNumber,
        });
      } else if (i === 4) {
        // 如果第四個 btn 顯示 ...
        paginationItems.push({
          type: 'omission',
        });
      } else {
        // 其餘顯示，5，6，7 尾數
        const page = props.maxPaginationNumber - (totalVisible - i);
        paginationItems.push({
          type: 'button',
          page,
          active: page === props.currentPaginationNumber,
        });
      }
    }
  } else if ([3, 4].includes(props.currentPaginationNumber)) {
    // 如果當前頁數是 [3,4] 其中一個數值
    for (let i = 1; i <= totalVisible; i += 1) {
      if (i <= 5) {
        // 顯示 5 個分頁 btn
        paginationItems.push({
          type: 'button',
          page: i,
          active: i === props.currentPaginationNumber,
        });
      } else if (i === 6) {
        // 如果第六個 btn 顯示 ...
        paginationItems.push({
          type: 'omission',
        });
      } else {
        // 其餘顯示尾數
        paginationItems.push({
          type: 'button',
          page: props.maxPaginationNumber,
          active: props.maxPaginationNumber === props.currentPaginationNumber,
        });
      }
    }
  } else if ([props.maxPaginationNumber - 2, props.maxPaginationNumber - 3].includes(props.currentPaginationNumber)) {
    // 如果當前頁數是 [198,197] 其中一個數值
    for (let i = 1; i <= totalVisible; i += 1) {
      if (i === 1) {
        // 如果第1個 btn 顯示 1
        paginationItems.push({
          type: 'button',
          page: 1,
          active: props.currentPaginationNumber === 1,
        });
      } else if (i === 2) {
        // 如果第2個 btn 顯示 ...
        paginationItems.push({
          type: 'omission',
        });
      } else {
        // 其餘顯示尾數 (page = 200 - (7-3, 7-4, 7-5, 7-6, 7-7))
        // page = 196, 197, 198, 199, 200
        const page = props.maxPaginationNumber - (totalVisible - i);
        paginationItems.push({
          type: 'button',
          page,
          active: page === props.currentPaginationNumber,
        });
      }
    }
  } else {
    // 剩餘當前頁數是 5 開始，會進入這裡
    for (let i = 1; i <= totalVisible; i += 1) {
      // 如果第1個 btn 顯示 1
      if (i === 1) {
        paginationItems.push({
          type: 'button',
          page: 1,
          active: props.currentPaginationNumber === 1,
        });
      } else if (i === 2 || i === 6) {
        // 如果第2個或第6個 btn 顯示 ...
        paginationItems.push({
          type: 'omission',
        });
      } else if (i === 7) {
        // 第7個 btn 顯示最後一筆頁數
        paginationItems.push({
          type: 'button',
          page: props.maxPaginationNumber,
          active: props.maxPaginationNumber === props.currentPaginationNumber,
        });
      } else {
        // 其餘第3，4，5個 btn 計算
        const diff = 4 - i;
        const page = props.currentPaginationNumber - diff;
        paginationItems.push({
          type: 'button',
          page,
          active: page === props.currentPaginationNumber,
        });
      }
    }
  }

  return paginationItems;
});

</script>
<template>
  <div class="buttons-pagination">
    <div
      v-for="(item, index) in paginationItemsForRender"
      :key="index"
      class="item"
      :class="{
        button: item.type === 'button',
        active: item.type === 'button' && item.active,
        omission: item.type === 'omission'
      }"
      @click="changePage(item)"
    >
      {{ item.type === 'button' ? item.page : '...' }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.buttons-pagination {
  box-sizing: border-box;
  display: flex;
  // border: 1px solid v-bind(borderColor);
  padding: 0px;
  background-color: #fff;
  border-radius: 4px;
  .item {
    cursor: pointer;
    height: v-bind(buttonSizePx);
    width: v-bind(buttonSizePx);
    line-height: v-bind(buttonSizePx);
    border-top: 1px solid v-bind(borderColor);
    border-bottom: 1px solid v-bind(borderColor);
    border-right: 1px solid v-bind(borderColor);
    &:first-of-type  {
      border-left: 1px solid v-bind(borderColor);
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &.button {
      &.active {
        background-color: v-bind(themeColor);
        border: 1px solid v-bind(themeColor);
        color: #fff;
      }
    }
  }
}
</style>
