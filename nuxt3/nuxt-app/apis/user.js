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

export const useOrderListApi = (page, limit = 20) => {
  return useHttpGet(
    'orderList',
    `/order/list?page=${page}&limit=${limit}`,
    { lazy: true }
  )
}

export const useUserExamTestApi = (page) => {
  return useHttpGet(
    'userExamTest',
    `/user_test/list?page=${page}`,
    { lazy: true }
  )
}

export const useUserPostListApi = (page) => {
  return useHttpGet(
    'userPostList',
    `/mypost?page=${page}`,
    { lazy: true }
  )
}

export const useUserCouponApi = (page) => {
  return useHttpGet(
    'userCoupon',
    `/user_coupon?page=${page}`,
    { lazy: true }
  )
}

export const useUserReceiveCouponApi = (body) => {
  return useHttpPost(
    'userReceiveCoupon',
    '/user_coupon/receive',
    { body }
  )
}

export const useUserFaveListApi = (page) => {
  return useHttpGet(
    'userFaveList',
    `/user_fava?page=${page}`,
    { lazy: true }
  )
}

export const useUserCollectApi = (body) => {
  return useHttpPost(
    'userCollect',
    '/collect',
    { body }
  )
}

export const useUserunCollectApi = (body) => {
  return useHttpPost(
    'userUnCollect',
    '/uncollect',
    { body }
  )
}

export const useUpdateUserInfoApi = (body) => {
  return useHttpPost(
    'updateUserInfo',
    '/update_info',
    { body }
  )
}

export const useUploadConfig = () => {
  const token = useCookie('token')

  return {
    action: CONFIG.baseURL + '/upload',
    headers: {
      appid: CONFIG.headers.appid,
      token: token.value
    }
  }
}

export const useUpdateUserPasswordApi = (body) => {
  return useHttpPost(
    'updateUserPassword',
    '/update_password',
    { body }
  )
}
