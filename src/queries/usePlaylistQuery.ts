import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export function usePlaylistQuery() {
  return useQuery({
    queryKey: ['playlist'],
    queryFn: fetchPlaylists,
    placeholderData: keepPreviousData,
  })
}

async function fetchPlaylists() {
  const url = 'https://64e9970736435f75.mokky.dev/playlist'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to get playlists')
  return res.json()
}