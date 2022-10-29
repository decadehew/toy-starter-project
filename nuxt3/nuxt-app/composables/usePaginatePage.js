export async function usePaginatePage (apiCallback) {
  const route = useRoute()
  const page = ref(parseInt(route.params.page))
  const limit = ref(10)

  const { data, pending, error, refresh } = await apiCallback({
    page: page.value,
    limit: limit.value
  })

  const rows = computed(() => data.value?.rows ?? [])
  const total = computed(() => data.value?.count ?? 0)
  const paginatePageHandler = (page) => {
    navigateTo({
      params: {
        ...route.params,
        page
      },
      query: {
        ...route.query
      }
    })
  }

  return {
    page,
    limit,
    data,
    pending,
    error,
    refresh,
    rows,
    total,
    paginatePageHandler
  }
}