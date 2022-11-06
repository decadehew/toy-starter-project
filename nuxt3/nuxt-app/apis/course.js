export const useCourseListApi = (page) => {
  return useHttpGet(
    'courseList',
    `/course/list?page${page}`,
    { lazy: true }
  )
}
