import { keepPreviousData, useQuery } from '@tanstack/vue-query'

<<<<<<< HEAD
export function usePlaylistQuery() {
=======
async function fetchPlaylists(id?: string): Promise<Playlist> {
  const response = await fetch(`/api/playlists/${id}`)
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

export function usePlaylistQuery(id: string) {
>>>>>>> 6db7f6d (fixed dropdown)
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