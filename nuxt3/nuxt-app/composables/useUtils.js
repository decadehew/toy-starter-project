export function useQueryToString(query = {}) {
  let q = ''
  for (const key in query) {
    if (q === '') {
      q = `?${key}=${query[key]}`
    } else {
      q += `&${key}=${query[key]}`
    }
  }

  return q
}

export function useEnterEvent (event) {
  const enterEventHandler = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      event()
    }
  }

  onBeforeMount(() => {
    document.addEventListener('keydown', enterEventHandler)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', enterEventHandler)
  })
}