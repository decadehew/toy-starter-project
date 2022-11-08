// export const useCourseListApi = (page) => {
//   return useHttpGet(
//     'courseList',
//     `/course/list?page${page}`,
//     { lazy: true }
//   )
// }

// export const useCourseDetailApi = (query = {}) => {
//   query = useQueryToString(query)

//   return useHttpGet(
//     'readCourse',
//     `/course/read${query}`,
//     { lazy: true }
//   )
// }

export const useHotCourseListApi = () => {
  return useHttpGet(
    'HotCourseList',
    `/hot`,
    { lazy: true }
  )
}

export const useOrderLearnApi = (body) => {
  return useHttpPost(
    'userOrderLearn',
    '/order/learn',
    { body }
  )
}
