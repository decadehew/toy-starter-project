import { createDiscreteApi } from 'naive-ui'

// 權限控制中間件
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token')

  if (token.value) {
    const { message } = createDiscreteApi(['message'])
    if (process.client) {
      message.warning('您已登入')
    }

    navigateTo('/')
  }
})
