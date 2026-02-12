import { apiPlaylists } from '@/api/playlists.ts'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'

export function useCreatePlaylist() {
  const { createPlaylist } = apiPlaylists
  const queryClient = useQueryClient()

  const createPlaylistMutation = useMutation({
    mutationFn: createPlaylist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: playlistKeys.all })
    },
  })

  return {
    create: createPlaylistMutation.mutate,
  }
}