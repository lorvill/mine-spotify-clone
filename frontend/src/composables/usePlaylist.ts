import {useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiPlaylists } from '@/api/playlists.ts'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'

export function usePlaylist(){
  const { createPlaylist, deletePlaylist } = apiPlaylists
  const queryClient = useQueryClient()


  const createPlaylistMutation = useMutation({
    mutationFn: createPlaylist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: playlistKeys.all })
    },
  })

  const deletePlaylistMutation = useMutation({
    mutationFn: deletePlaylist,
    onSuccess: async (data, deletedId) => {
      await queryClient.invalidateQueries({
        queryKey: playlistKeys.all,
        exact: true
      }) // exact:true говорит о том что нужно обновить только по ключу "['playlists']"
      queryClient.removeQueries({ queryKey: playlistKeys.currentPlaylist(deletedId)}) // удаляем данные удаленного плейлиста из кэша
    },
  })

  return {
    createPlaylistMutation,
    deletePlaylistMutation,
  }
}
