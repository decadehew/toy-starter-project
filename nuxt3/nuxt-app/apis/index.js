export function useIndexDataApi () {
  return useHttpGet('indexData', '/index', { lazy: true })
}

export function useGroupDataApi (query) {
  query = useQueryToString(query)
  return useHttpGet('groupData', `/group/list${query}`)
}
