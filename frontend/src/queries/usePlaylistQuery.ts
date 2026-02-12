import { useQuery } from '@tanstack/vue-query'
import type { Playlist } from '@/types/playlist.ts'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'

async function fetchPlaylists(id?: string): Promise<Playlist[] | Playlist> {
  const response = await fetch(`/api/playlists/${id}`)
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

export function usePlaylistQuery(id: string) {
  return useQuery({
    queryKey: playlistKeys.currentPlaylist(id),
    queryFn: () => fetchPlaylists(id) as Promise<Playlist>,
    enabled: !!id,
    retry: 1,
  })
}
