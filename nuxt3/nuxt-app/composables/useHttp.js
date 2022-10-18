const CONFIG = {
  baseURL: 'http://demonuxtapi.dishait.cn/pc',
  headers: {
    appid: 'bd9d01ecc75dbbaaefce'
  }
}

function useGetFetchOptions (opts = {}) {
  opts.baseURL = opts.baseURL ?? CONFIG.baseURL
  opts.headers = opts.headers ?? { appid: CONFIG.headers.appid ?? ''}
  opts.initialCache = opts.initialCache ?? false
  opts.lazy = opts.lazy ?? false

  return opts
}

export async function useHttp (key, url, opts = {}) {
  opts = useGetFetchOptions(opts)
  opts.key = key

  let response = await useFetch(url, {
    ...opts,
    transform: (res) => {
      return res.data
    }
  })

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
