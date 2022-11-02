export const usePostSupportApi = (post_id, type = 'support') => {
  return useHttpPost('postSupport', `/post/${type}`, {
    body: {
      post_id
    }
  })
}

export const useDeletePostApi = (id) => {
  return useHttpPost('deletePost', '/post/delete', {
    body: {
      id
    }
  }) 
}
