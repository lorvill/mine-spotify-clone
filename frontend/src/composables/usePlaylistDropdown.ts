import {useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiPlaylists } from '@/api/playlists.ts'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'
import { useToast } from 'vue-toastification'

const toast = useToast()

export function usePlaylistDropdown(){
  const { deletePlaylist, editPlaylist } = apiPlaylists
  const queryClient = useQueryClient()

  const deletePlaylistMutation = useMutation({
    mutationFn: deletePlaylist,
    onSuccess: async (data, deletedId) => {
      await queryClient.invalidateQueries({
        queryKey: playlistKeys.all,
        exact: true
      }) // exact:true говорит о том что нужно обновить только по ключу "['playlists']"
      queryClient.removeQueries({ queryKey: playlistKeys.currentPlaylist(deletedId)}) // удаляем данные удаленного плейлиста из кэша
      toast.success('Playlist deleted successfully.')
    },
    onError: () => {
      toast.error('Error while deleting playlist')
    }
  })

  const editPlaylistMutation = useMutation({
    mutationFn: editPlaylist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: playlistKeys.all,
        exact: true
      })
      toast.success('Playlist edited successfully.')
    },
    onError: () => {
      toast.error('Error while editing playlist')
    }
  })

  return {
    deletePlaylistMutation,
    editPlaylistMutation,
  }
}
