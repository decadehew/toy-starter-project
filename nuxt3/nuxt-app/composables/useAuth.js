import { createDiscreteApi } from 'naive-ui'
import { useGetInfoApi, useLogoutApi } from '@/apis/user'
import { usePostSupportApi } from '@/apis/bbs'

export const useUser = () => useState('user', () => null)

export const useRefreshUserInfo = async () => {
  const token = useCookie('token')
  const user = useUser()

  if (token.value) {
    const  { data, error } = await useGetInfoApi()
    console.log('我有 token', data.value)

    if (data.value) {
      user.value = data.value
    }
  } else {
    console.log('nothing')
  }
}

export const useLogout = async () => {
  await useLogoutApi()
  const user = useUser()
  user.value = null

  const token = useCookie('token')
  if (token.value) {
    token.value = null
  }

  const { message } = createDiscreteApi(['message'])
  message.success('退出成功')
  const route = useRoute()
  if (route.path !== '/') {
    navigateTo('/', { replace: true })
  }
}

export const useHasAuth = (callback = null) => {
  const route = useRoute()
  const user = useUser()
  const token = useCookie('token')

  if (!token.value) {
    const { message } = createDiscreteApi(['message'])
    message.error('請先登入')
    return navigateTo('/login?from=' + route.fullPath)
  }

  const phone = user.value?.phone
  if (!phone && route.name !== 'bindphone') {
    message.error('請先綁定手機號')
    return navigateTo('/bindphone?from=' + route.fullPath)
  }

  if (callback && typeof callback === 'function') {
    callback()
  }
}

export const useSupportPost = () => {
  const isLoadingBySupport = ref(false)
  const handleSupport = (item) => {
    // Auth must be logged
    useHasAuth(async () => {
      const type = item.issupport ? 'unsupport' : 'support'
      const msg = item.issupport ? '取消點讚' : '點贊'

      isLoadingBySupport.value = true
      const { error } = await usePostSupportApi(item.id, type)
      isLoadingBySupport.value = false

      if (error.value) return
      if (type === 'unsupport') {
        item.support_count--
      } else {
        item.support_count++
      }

      item.issupport = !item.issupport
      const { message } = createDiscreteApi(['message'])
      message.success(msg + '成功')
    })
  }

  return {
    isLoadingBySupport, handleSupport
  }
}
