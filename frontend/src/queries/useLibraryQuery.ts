import { keepPreviousData, useQuery } from '@tanstack/vue-query'

async function fetchLibrary() {
  const res = await fetch('/api/library')
  if (!res.ok) throw new Error('Failed to fetch library')
  return res.json()
}

export function useLibraryQuery() {
  return useQuery({
    queryKey: ['library'],
    queryFn: fetchLibrary,
    placeholderData: keepPreviousData,
  })
}
