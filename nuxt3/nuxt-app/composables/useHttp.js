import { createDiscreteApi } from 'naive-ui'

export const CONFIG = {
  baseURL: 'http://demonuxtapi.dishait.cn/pc',
  headers: {
    appid: 'bd9d01ecc75dbbaaefce'
  }
}

function useGetFetchOptions (opts = {}) {
  opts.baseURL = opts.baseURL ?? CONFIG.baseURL
  opts.headers = opts.headers ?? { appid: CONFIG.headers.appid }
  opts.initialCache = opts.initialCache ?? false
  opts.lazy = opts.lazy ?? false

  const token = useCookie('token')
  if (token.value) {
    opts.headers.token = token.value
  }

  return opts
}

export async function useHttp (key, url, opts = {}) {
  opts = useGetFetchOptions(opts)
  opts.key = key

  if (opts.$) {
    const data = ref(null)
    const error = ref(null)

    return await $fetch(url, opts)
      .then(res => {
        data.value = res.data
        return { data, error }
      })
      .catch(err => {
        const msg = err?.data?.data
        if (process.client) {
          const { message } = createDiscreteApi(['message'])
          message.error(msg || 'Server Error')
        }
        error.value = msg
        return { data, error }
      })
  }

  let response = await useFetch(url, {
    ...opts,
    transform: (res) => {
      return res.data
    }
  })

  if (process.client && response.error.value) {
    const msg = response.error.value?.data?.data
    if (!opts.lazy) {
      const { message } = createDiscreteApi(['message'])
      message.error(msg || 'Server Error')
    }
  }

  return response
}

export function useHttpGet (key, url, opts = {}) {
  opts.method = 'GET'
  return useHttp(key, url, opts)
}

export function useHttpPost (key, url, opts = {}) {
  opts.method = 'POST'
  return useHttp(key, url, opts)
}
