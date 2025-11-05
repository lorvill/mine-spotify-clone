import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export function useLikedTracksQuery() {
  return useQuery({
    queryKey: ['tracks'],
    queryFn: fetchLikedTracks,
    placeholderData: keepPreviousData,
  })
}

async function fetchLikedTracks() {
  const url = 'https://64e9970736435f75.mokky.dev/liked-tracks'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to get liked tracks')
  return res.json()
}