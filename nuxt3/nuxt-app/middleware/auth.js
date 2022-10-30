import { createDiscreteApi } from 'naive-ui'

// 權限控制中間件
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token')
  const user = useUser()
  const route = useRoute()

  if (!token.value) {
    const { message } = createDiscreteApi(['message'])
    if (process.client) {
      message.error('請先登入')
    }

    return navigateTo('/login?from=' + route.fullPath)
  }

  const phone = user.value?.phone
  if (!phone && route.name !== 'bindphone') {
    const { message } = createDiscreteApi(['message'])
    if (process.client) {
      message.error('請先綁定手機號')
    }

    return navigateTo('/bindphone?from=' + route.fullPath)
  }
})
