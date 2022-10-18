export default defineNuxtRouteMiddleware ((to, from) => {
  const { type, page } = to.params
  const { keyword } = to.query

  if (!keyword) {
    return abortNavigation('不可為空')
  }

  if (!['course', 'column'].includes(type) || isNaN(+page)) {
    return abortNavigation('您的頁面不見了!!!')
  }
})
