import { useQuery } from '@tanstack/vue-query'
import type { Playlist } from '@/types/playlist.ts'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'
import { type MaybeRefOrGetter, toValue } from 'vue'

async function fetchPlaylist(id: string): Promise<Playlist> {
  const response = await fetch(`/api/playlists/${id}`)
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

export function usePlaylistQuery(id: MaybeRefOrGetter<string | undefined>) {
  return useQuery({
    queryKey: playlistKeys.currentPlaylist(() => toValue(id)!),
    queryFn: () => fetchPlaylist(toValue(id)!) as Promise<Playlist>,
    enabled: () => !!toValue(id),
    retry: 0,
  })
}
