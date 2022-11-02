<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})

const classObj = {
  answerStatus: props.item.answer_status ? 'text-green-600' : 'text-rose-500',
  readStatus: props.item.read_status ? 'text-green-600' : 'text-rose-500'
}

</script>
<template>
  <ui-card>
    <ui-card-header class="flex justify-between">
      <span>{{item.testpaper.title}}</span>
      <span :class="classObj.answerStatus">{{item.answer_status ? '考試完成' : '考試中'}}</span>
    </ui-card-header>
    <ui-card-body>
      <small class="mr-3">題目總數：{{item.testpaper.question_count}}</small>
      <small class="mr-3">總份數：{{item.testpaper.total_score}}</small>
      <small class="mr-3">及格分數：{{item.testpaper.pass_score}}</small>
    </ui-card-body>
    <ui-card-footer class="flex justify-between">
      <span>{{item.created_time}}</span>
      <span :class="classObj.readStatus">
        最終得分：<span>{{item.read_status ? item.score : '正在批改'}}</span>
      </span>
    </ui-card-footer>
  </ui-card>
</template>
