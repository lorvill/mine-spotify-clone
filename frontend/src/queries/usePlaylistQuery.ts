import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { Playlist } from '@/types/playlist.ts'

async function fetchPlaylists(id?: string): Promise<Playlist[] | Playlist> {
  const url = id ? `/api/playlists/${id}` : `/api/playlists`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export function usePlaylistQuery(id: string) {
  return useQuery({
    queryKey: ['playlist', id],
    queryFn: () => fetchPlaylists(id) as Promise<Playlist>,
    enabled: !!id,
    retry: 1,
  })
}

export function useAllPlaylistsQuery() {
  return useQuery({
    queryKey: ['all-playlists'],
    queryFn: () => fetchPlaylists(),
    staleTime: 5 * 60 * 1000
  })
}

