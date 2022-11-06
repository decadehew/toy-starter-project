const typeObj = {
  course: '課程',
  column: '專欄',
  book: '電子書',
  group: '拼團',
  flashsale: '秒殺'
}

export default defineNuxtRouteMiddleware((to, from) => {
  const { type, page } = to.params
  if (Object.keys(typeObj).includes(type) && !isNaN(+page)) {
    const title = typeObj[type] + '列表'
    useHead({ title })
    to.meta.title = title
    return true
  }

  return abortNavigation('頁面是 404')
})
