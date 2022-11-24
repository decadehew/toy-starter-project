<script lang="ts" setup>
import {
  useSlots, computed, toRefs, PropType, ref, watch,
} from 'vue';
import MultipleSelectCheckBox from './MultipleSelectCheckBox.vue';
import SingleSelectCheckBox from './SingleSelectCheckBox.vue';
import RowsSelector from './RowsSelector.vue';
import LoadingLine from './LoadingLine.vue';
// 自定義 TS 類型
import type {
  Header, Item, ClientSortOptions, ServerOptions,
} from '@/types/table';
// vite-svg-loader
import ArrowIcon from '@/assets/caret-up.svg';

type SortType = 'asc' | 'desc'
type HeaderForRender = {
  text: string,
  value: string,
  sortable?: boolean,
  sortType?: SortType | null
}
type ServerOptionsComputed = {
  page: number,
  rowsPerPage: number,
  sortBy: string | null,
  sortType: SortType | null,
}

// Configuration Props
const props = defineProps({
  bodyFontColor: {
    type: String,
    default: '#212121',
  },
  bodyFontSize: {
    type: Number,
    default: 12,
  },
  emptyMessage: {
    type: String,
    default: 'No Available Data',
  },
  fixedHeader: {
    type: Boolean,
    default: true,
  },
  headerFontColor: {
    type: String,
    default: '#373737',
  },
  headerFontSize: {
    type: Number,
    default: 12,
  },
  headers: {
    type: Array as PropType<Header[]>,
    required: true,
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  maxHeight: {
    type: Number,
    default: () => 400,
  },
  rowHeight: {
    type: Number,
    default: () => 48,
  },
  wrapLines: {
    type: Boolean,
    default: false,
  },
  itemsSelected: {
    type: Array as PropType<Item[]> | null,
    default: null,
  },
  search: {
    type: String,
    default: '',
  },
  rowsPerPage: {
    type: Number,
    default: 25,
  },
  rowsItems: {
    type: Array as PropType<number[]>,
    default: () => [25, 50, 100],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  serverOptions: {
    type: Object as PropType<ServerOptions>,
    default: () => {},
  },
  serverItemsLength: {
    type: Number,
    default: 0,
  },
  sortBy: {
    type: String,
    default: null,
  },
  sortType: {
    type: String as PropType<SortType>,
    default: null,
  },
});
const emits = defineEmits([
  'clickItem',
  'update:itemsSelected',
  'update:isAllSelected',
  'update:serverOptions',
]);

const slots = useSlots();

// https://cn.vuejs.org/api/composition-api-setup.html#accessing-props
const {
  headerFontColor,
  bodyFontColor,
} = toRefs(props);

// 是否有 slots
const ifHasBodySlot = computed(() => slots.body);
// tr 高度
const rowHeight = computed(() => `${props.rowHeight}px`);
// header 字體大小
const headerFontSizePx = computed(() => `${props.headerFontSize}px`);
// tbody 字體大小
const bodyFontSizePx = computed(() => `${props.bodyFontSize}px`);
// table 最大高度
const tableMaxHeight = computed(() => `${props.maxHeight}px`);
// 是否【其中 item】已勾選？
const isMultipleSelectable = computed((): boolean => props.itemsSelected !== null);
const isServerSideMode = computed((): boolean => props.serverItemsLength > 0);

// 初始化 headers 中 object 屬性
const initHeadersForRender = (): HeaderForRender[] => {
  // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  const headersWithSortType = structuredClone(props.headers);
  headersWithSortType.map((header: HeaderForRender) => {
    const headerWithSortType = header;
    // 判斷是否有排序 - 如有初始化為 none
    if (header.sortable) headerWithSortType.sortType = null;
    if (isServerSideMode.value && header.value === props.serverOptions.sortBy) {
      headerWithSortType.sortType = props.serverOptions.sortType;
    }
    if (!isServerSideMode.value && header.value === props.sortBy) {
      headerWithSortType.sortType = props.sortType;
    }
    return headerWithSortType;
  });

  // isMultipleSelectable 為 checkbox，添加新屬性到 object
  return isMultipleSelectable.value
    ? [{ text: 'checkbox', value: 'checkbox' }, ...headersWithSortType] : headersWithSortType;
};

const headersForRender = ref(initHeadersForRender());
const headerColumns = computed((): string[] => headersForRender.value.map((header) => header.value));

const serverOptionsComputed = computed({
  get: (): ServerOptionsComputed => ({
    page: 1,
    rowsPerPage: props.serverOptions.rowsPerPage ?? props.rowsPerPage,
    sortBy: props.serverOptions.sortBy ?? null,
    sortType: props.serverOptions.sortType ?? null,
  }),
  set: (value) => {
    emits('update:serverOptions', value);
  },
});
const selectItemsComputed = computed({
  get: () => props.itemsSelected,
  set: (value) => {
    // 被勾選中，觸發 update:itemsSelected 事件
    emits('update:itemsSelected', value);
  },
});
const multipleSelectStatus = computed((): 'allSelected' | 'noneSelected' | 'partSelected' => {
  if (selectItemsComputed.value.length === props.items.length) {
    return 'allSelected';
  }
  if (selectItemsComputed.value.length === 0) {
    return 'noneSelected';
  }
  return 'partSelected';
});
const itemsSearching = computed((): Item[] => {
  if (!isServerSideMode.value && props.search !== '') {
    const regex = new RegExp(props.search, 'i');
    return props.items.filter((item) => regex.test(Object.values(item).join('')));
  }

  return props.items;
});

// Pagination
const currentPaginationNumber = ref(1);
// 當前頁數：筆數 (10)
const rowsPerPageReactive = ref(props.rowsPerPage);
watch(rowsPerPageReactive, (value) => {
  if (isServerSideMode.value) {
    serverOptionsComputed.value = {
      ...serverOptionsComputed.value,
      page: 1,
      rowsPerPage: value,
    };
  }

  currentPaginationNumber.value = 1;
});
const initClientSortOptions = (): ClientSortOptions | null => {
  if (props.sortBy && props.sortType) {
    return {
      sortBy: props.sortBy,
      sortDesc: props.sortType === 'desc',
    };
  }

  return null;
};
const clientSortOptions = ref<ClientSortOptions | null>(initClientSortOptions);
const updateSortField = (newSortBy: string) => {
  let newSortType: SortType | null = null;
  // update headers sorting
  headersForRender.value.map((item) => {
    const itemSortingUpdated = item;
    if (item.sortable) {
      if (item.value === newSortBy) {
        if (item.sortType === null) {
          newSortType = 'asc';
        } else if (item.sortType === 'asc') {
          newSortType = 'desc';
        } else {
          newSortType = null;
        }

        itemSortingUpdated.sortType = newSortType;
      } else {
        itemSortingUpdated.sortType = null;
      }
    }

    return itemSortingUpdated;
  });

  if (isServerSideMode.value) {
    // update server options
    serverOptionsComputed.value = {
      page: 1,
      rowsPerPage: rowsPerPageReactive.value,
      sortBy: newSortType !== null ? newSortBy : null,
      sortType: newSortType,
    };
  } else if (newSortType === null) {
    clientSortOptions.value = null;
  } else {
    clientSortOptions.value = {
      sortBy: newSortBy,
      sortDesc: newSortType === 'desc',
    };
  }
};

// 已排序好 items
const itemsSorting = computed((): Item[] => {
  if (isServerSideMode.value) return props.items;
  if (clientSortOptions.value === null) return itemsSearching.value;
  const { sortBy, sortDesc } = clientSortOptions.value;
  const itemsSearchingSorted = structuredClone(itemsSearching.value);
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return itemsSearchingSorted.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
    if (a[sortBy] < b[sortBy]) return sortDesc ? 1 : -1;
    if (a[sortBy] > b[sortBy]) return sortDesc ? -1 : 1;
    return 0;
  });
});

const totalItemsLength = computed((): number => (isServerSideMode.value ? props.serverItemsLength : itemsSearching.value.length));
// 分頁：1-{10}
const lastIndexOfItemsInCurrentPage = computed((): number => Math.min(
  itemsSearching.value.length,
  currentPaginationNumber.value * rowsPerPageReactive.value,
));
// 分頁：{1}-10
const firstIndexOfItemsInCurrentPage = computed((): number => (currentPaginationNumber.value - 1)
  * rowsPerPageReactive.value + 1);
// page up, page down
const maxPaginationNumber = computed((): number => Math.ceil(itemsSearching.value.length / rowsPerPageReactive.value));
const isLastPage = computed((): boolean => currentPaginationNumber.value === maxPaginationNumber.value);
const isFirstPage = computed((): boolean => currentPaginationNumber.value === 1);
const isLoadingNextPageFromServer = ref(false);
const { loading } = toRefs(props);
const nextPage = () => {
  if (isLastPage.value) return;
  if (loading.value) return;
  if (isServerSideMode.value && props.items.length < (currentPaginationNumber.value * rowsPerPageReactive.value + 1)) {
    // in server-side mode, load more from server if data lacks.
    const nextPaginationNumber = currentPaginationNumber.value + 1;
    serverOptionsComputed.value = {
      ...serverOptionsComputed.value,
      page: nextPaginationNumber,
    };
    isLoadingNextPageFromServer.value = true;
  } else {
    currentPaginationNumber.value += 1;
  }
};
watch(loading, (newVal, oldVal) => {
  if (isLoadingNextPageFromServer.value) {
    // in server-side mode, pape up when serve data loading finished.
    if (newVal === false && oldVal === true) {
      currentPaginationNumber.value += 1;
      isLoadingNextPageFromServer.value = false;
    }
  }
});
const prevPage = () => {
  if (isFirstPage.value) return;
  currentPaginationNumber.value -= 1;
};
// 當前頁數的 items，根據 rowsPages 數量
const itemsInPage = computed((): Item[] => {
  const res: Item[] = [];
  for (let i = firstIndexOfItemsInCurrentPage.value - 1;
    i < lastIndexOfItemsInCurrentPage.value; i += 1) {
    res.push(itemsSorting.value[i]);
  }
  return res;
});
// items for render (with checbox)
const itemsForRender = computed((): Item[] => {
  if (!isMultipleSelectable.value) return itemsInPage.value;
  // multi select
  if (multipleSelectStatus.value === 'allSelected') {
    return itemsInPage.value.map((item) => ({ checkbox: true, ...item }));
  } if (multipleSelectStatus.value === 'noneSelected') {
    return itemsInPage.value.map((item) => ({ checkbox: false, ...item }));
  }
  return itemsInPage.value.map((item) => {
    const isSelected = selectItemsComputed.value.findIndex((selectItem) => JSON.stringify(selectItem)
      === JSON.stringify(item)) !== -1;
    return { checkbox: isSelected, ...item };
  });
});
const toggleSelectAll = (isChecked: boolean): void => {
  selectItemsComputed.value = isChecked ? itemsSearching.value : [];
};
// 監聽每個 row item checkbox
// 待續: 為什麼 checkbox 如何變化
const toggleSelectItem = (item: Item):void => {
  const isAlreadyChecked = item.checkbox;
  // 每次 checked 和 unchecked 都會移除此屬性
  // eslint-disable-next-line no-param-reassign
  delete item.checkbox;
  if (!isAlreadyChecked) {
    // 表示已經 checked item
    const selectItemsArr: Item[] = selectItemsComputed.value;
    selectItemsArr.unshift(item);
    selectItemsComputed.value = selectItemsArr;
  } else {
    selectItemsComputed.value = selectItemsComputed.value.filter((selectedItem) => JSON.stringify(selectedItem)
      !== JSON.stringify(item));
  }
};
// event of click item
const clickItem = (item: Item) => {
  emits('clickItem', item);
};
</script>
<template>
  <div class="data-table">
    <div
      class="data-table__body"
      :class="{'fixed-header': fixedHeader, 'wrap-lines': wrapLines }"
    >
      <table>
        <thead v-if="headersForRender.length">
          <tr>
            <th
              v-for="(header, index) in headersForRender"
              :key="index"
              :class="{
                sortable: header.sortable,
                'none': header.sortable && header.sortType === 'null',
                'desc': header.sortable && header.sortType === 'desc',
                'asc': header.sortable && header.sortType === 'asc',
              }"
              @click="header.sortable ? updateSortField(header.value) : null"
            >
              <MultipleSelectCheckBox
                v-if="header.text === 'checkbox'"
                :key="multipleSelectStatus"
                :status="multipleSelectStatus"
                @change="toggleSelectAll"
              />
              <span
                v-else
                class="header-text"
              >
                {{ header.text }}
                <span
                  v-if="header.sortable"
                  :key="header.sortType ? header.sortType : 'none'"
                  class="sortType-icon"
                  :class="{'desc': header.sortType === 'desc'}"
                >
                  <ArrowIcon
                    class="sortType-icon__svg"
                  />
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <th
          v-if="loading"
          class="loading-th"
          :colspan="headerColumns.length"
        >
          <LoadingLine />
        </th>
        <slot
          v-if="ifHasBodySlot"
          name="body"
        />
        <template v-else>
          <tbody v-if="items.length && headerColumns.length">
            <tr
              v-for="(item) in itemsForRender"
              :key="JSON.stringify(item)"
              @click="clickItem(item)"
            >
              <td
                v-for="(column, i) in headerColumns"
                :key="i"
              >
                <!-- 使用 slot 可以彈性和自定義屬性 -->
                <!-- 以下面例子 -->
                <!--
                  name 指定插入內容
                  v-bind 傳遞插槽 props
                  item 是一個 row object
                 -->
                <slot
                  v-if="slots[column]"
                  :name="column"
                  v-bind="item"
                />
                <template v-else-if="column === 'checkbox'">
                  <SingleSelectCheckBox
                    :checked="item[column]"
                    @change="toggleSelectItem(item)"
                  />
                </template>
                <template v-else>
                  {{ Array.isArray(item[column]) ? item[column].join(',') : item[column] }}
                </template>
              </td>
            </tr>
          </tbody>
        </template>
      </table>

      <div
        v-if="!items.length"
        class="data-table__message"
      >
        {{ emptyMessage }}
      </div>
    </div>
    <div class="data-table__footer">
      <div class="footer__rows-per-page">
        rows per page:
        <RowsSelector
          v-model="rowsPerPageReactive"
          :rows-items="rowsItems"
        />
      </div>
      <div class="footer__items-index">
        {{ `${firstIndexOfItemsInCurrentPage}-${lastIndexOfItemsInCurrentPage}` }}
        of {{ totalItemsLength }}
      </div>
      <div
        class="footer__previous-page-click-button"
        :class="{'first-page': isFirstPage}"
        @click="prevPage"
      >
        <span class="arrow arrow-right"></span>
      </div>
      <div
        class="footer__next-page-click-button"
        :class="{'last-page': isLastPage}"
        @click="nextPage"
      >
        <span class="arrow arrow-left"></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.data-table {
  box-sizing: border-box;
  .data-table__body {
    box-sizing: border-box;
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    .loading-th {
      padding: 0px;
    }
    &.fixed-header {
      th {
        position: sticky;
        top: 0;
      }
    }
    &.wrap-lines {
      table {
        table-layout: fixed;
        word-break: break-all;
      }
    }
  }
}
.data-table__body:deep() {
  max-height: v-bind(tableMaxHeight);
  border: thin solid rgba(0,0,0,.12);
  overflow: scroll;
  position: relative;
  table {
    width: 100%;
    background-color: #fff;
    border-spacing: 0;
    tr {
      height: v-bind(rowHeight);
      &.empty-wrapper {
        color: rgba(0,0,0,.38);
        width: 100%;
        td {
          text-align: center;
        }
      }
    }
    th, td {
      text-align: left;
      padding: 0px 10px;
    }
    thead, tbody {
      position: relative;
    }
    thead {
      z-index: 1;
      th {
        border-bottom: thin solid rgba(0,0,0,.12);
        font-size: v-bind(headerFontSizePx);
        color: v-bind(headerFontColor);
        position: relative;
        background-color: #f8f8f8;
        .header-text {
          display: flex;
          align-items: center;
          height: v-bind(headerFontSizePx);
        }
        &.sortable {
          cursor: pointer;
          &.none {
              &:hover {
              .sortType-icon {
                opacity: 1;
              }
            }
            .sortType-icon {
              opacity: 0;
              transition: opacity 0.5s ease;
              &__svg {
                path {
                  fill: rgb(158 158 158);
                }
              }
            }
          }
          &.desc {
            path {
              fill: v-bind(headerFontColor);
            }
          }
        }
        .sortType-icon {
          display: inline-block;
          width: v-bind(headerFontSizePx);
          height: v-bind(headerFontSizePx);
          &__svg {
            width: v-bind(headerFontSizePx);
            height: v-bind(headerFontSizePx);
          }
          &.desc {
            transform: rotate(180deg);
          }
        }
      }
    }
    tbody {
      tr {
        cursor: pointer;
        &:hover {
          background-color: #eee;
        }
        &:last-child {
          border-bottom: none;
          td {
            border-bottom: none;
          }
        }
      }
      td {
        color: v-bind(bodyFontColor);
        font-size: v-bind(bodyFontSizePx);
        border-bottom: thin solid rgba(0,0,0,.12);
      }
    }
  }
  .data-table__message {
    text-align: center;
    color: v-bind(bodyFontColor);
    font-size: v-bind(bodyFontSizePx);
    padding: 20px;
  }
  .gms_base_dialog__loading {
    display: block;
    width: 50px;
    margin: 0 auto;
  }
}
.data-table__footer {
  width: 100%;
  display: flex;
  border: thin solid rgba(0,0,0,.12);
  border-top: none;
  font-size: 12px;
  align-items: center;
  justify-content: right;
  padding: 10px 5px;
  box-sizing: border-box;
  .footer__rows-per-page {
    display: flex;
    align-items: center;
  }
  .footer__items-index {
    margin: 0px 20px 0px 10px;
  }
  .footer__previous-page-click-button, .footer__next-page-click-button {
    margin-right: 5px;
    cursor: pointer;
    .arrow {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-top: 2px solid #000;
      border-left: 2px solid #000;
      &.arrow-left {
        transform: rotate(135deg);
      }
      &.arrow-right {
        transform: rotate(-45deg);
      }
    }
  }
  .footer__previous-page-click-button.first-page, .footer__next-page-click-button.last-page {
    cursor: not-allowed;
    .arrow {
      border-color: #e0e0e0;
    }
  }
}
</style>
