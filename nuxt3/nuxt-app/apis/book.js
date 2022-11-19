export const useBookMenusApi = (id) => {
  return useHttpGet(
    'bookMenus',
    `/book/menus?id=${id}`,
    { lazy: true }
  )
}

export const useBookDetailApi = (book_id, id) => {
  return useHttpGet(
    'bookDetail',
    `/book/detail?book_id=${book_id}&id=${id}`,
    { lazy: true }
  )
}

