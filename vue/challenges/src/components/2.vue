<!-- https://cn-vuejs-challenges.netlify.app/questions/2-ref-family/README.zh-CN.html -->
<!-- ref 全家桶 -->
<script setup lang="ts">
import { ref, Ref, reactive } from "vue"

const initial = ref(10)
const count = ref(0)

// 挑战 1: 更新 ref
function update(value) {
  // 实现...
}

/**
 * 挑战 2: 检查`count`是否为一个 ref 对象
 * 确保以下输出为1
*/
console.log(
  // impl ? 1 : 0
)

/**
 * 挑战 3: 如果参数是一个 ref，则返回内部值，否则返回参数本身
 * 确保以下输出为true
*/
function initialCount(value: number | Ref<number>) {
  // 确保以下输出为true
  console.log(value === 10)
}

initialCount(initial)

/**
 * 挑战 4:
 * 为源响应式对象上的某个 `property` 新创建一个 `ref`。
 * 然后,`ref` 可以被传递，它会保持对其源`property`的响应式连接。
 * 确保以下输出为true
*/
const state = reactive({
  foo: 1,
  bar: 2,
})
const fooRef = ref() // 修改这里的实现...

// 修改引用将更新原引用
fooRef.value++
console.log(state.foo === 2)

// 修改原引用也会更新`ref`
state.foo++
console.log(fooRef.value === 3)

</script>

<template>
  <div>
    <h1>msg</h1>
    <p>
      <span @click="update(count-1)">-</span>
      {{ count }}
      <span @click="update(count+1)">+</span>
    </p>
  </div>
</template>
