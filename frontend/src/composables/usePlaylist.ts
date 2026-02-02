import {useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiPlaylists } from '@/api/playlists.ts'

export function usePlaylist(){
  const { createPlaylist, deletePlaylist } = apiPlaylists
  const queryClient = useQueryClient()

  const createPlaylistMutation = useMutation({
    mutationFn: createPlaylist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
  })

  const removePlaylistMutation = useMutation({
    mutationFn: deletePlaylist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
  })

  return {
    createPlaylistMutation,
    removePlaylistMutation,
  }
}
