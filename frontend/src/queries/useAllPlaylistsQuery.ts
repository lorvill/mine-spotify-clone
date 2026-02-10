import { useQuery } from '@tanstack/vue-query'
import type { Playlist } from '@/types/playlist.ts'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'
import { useAuthentication } from '@/composables/useAuthentication.ts'

async function fetchAllPlaylists() : Promise<Playlist[]> {
  const response = await fetch('/api/playlists')
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

export function useAllPlaylistsQuery() {
  const { isAuthenticated } = useAuthentication()

  const playlists = useQuery<Playlist[]>({
    queryKey: playlistKeys.all,
    queryFn: () => fetchAllPlaylists() as Promise<Playlist[]>,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error: any) => {
      if (error?.message === 'Unauthorized') return false
      else return failureCount < 1
    },
    enabled: isAuthenticated,
  })

  return {
    data: playlists.data,
    status: playlists.status,
  }
}