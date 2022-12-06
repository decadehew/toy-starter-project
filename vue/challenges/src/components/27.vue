<!-- https://cn-vuejs-challenges.netlify.app/questions/27-global-css/README.zh-CN.html -->
<template>
  <p>Hello Vue.js</p>
</template>

<style scoped>

p {
  font-size:20px;
  color:red;
  text-align: center;
  line-height: 50px;
}

/* 使其工作 */
/* https://vuejs.org/api/sfc-css-features.html#scoped-css */
:global(body) {
  width: 100vw;
  height: 100vh;
  background-color: burlywood;
}
</style>
