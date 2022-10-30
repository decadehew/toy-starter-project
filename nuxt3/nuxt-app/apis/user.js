export const useRegisterApi = (body) => {
  return useHttpPost('reg', '/reg', { body })
}

export const useLoginApi = (body) => {
  return useHttpPost('login', '/login', { body })
}

export const useGetInfoApi = () => {
  return useHttpGet('getinfo', '/getinfo', { $: true })
}

export const useLogoutApi = () => {
  return useHttpGet('logout', '/logout')
}

export const useGetCaptchaApi = (phone) => {
  return useHttpPost('getCaptcha', '/get_captcha', { body: { phone } })
}

export const useBindPhoneApi = (body) => {
  return useHttpPost('bindPhone', '/bind_mobile', { body })
}

export const useForgetApi = (body) => {
  return useHttpPost('forget', '/forget', { body })
}

// 學習紀錄
export const useUserHistoryApi = (query) => {
  return useHttpGet(
    'userLearnHistory',
    () => {
      let formatQuery = useQueryToString(query())
      return `/user_history/list${formatQuery}`
    },
    {
      lazy: true
    }
  )
}
