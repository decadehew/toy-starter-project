export const useSearchListApi = (query) => {
  /**
   * query function
   * 說明：
   * useFetch 第一個參數是 request
   * computed (request) 會監聽 request 變化，重新計算最新的值
   * 如果依賴屬性沒有變化，就會吃 cache 值
   * 
   */
  return useHttpGet(
    'searchList',
    () => {
      // debugger
      let formatQuery = useQueryToString(query())
      return `/search${formatQuery}`
    },
    {
      lazy: true
    }
  )
}
