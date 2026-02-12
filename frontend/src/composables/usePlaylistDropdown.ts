import {useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiPlaylists } from '@/api/playlists.ts'
import type { Option } from '@/types/option.ts'
import type { DropdownPlaylist } from '@/types/dropdownActions.ts'
import type { Playlist } from '@/types/playlist.ts'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'

export function usePlaylistDropdown(){
  const { deletePlaylist } = apiPlaylists
  const queryClient = useQueryClient()

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

  const playlistOptions: Option<DropdownPlaylist>[] = [
    { option: 'edit', name: 'Edit' },
    { option: 'share', name: 'Share' },
    { option: 'delete', name: 'Delete' },
  ]

  const handlePlaylistAction = (option: DropdownPlaylist, playlist: Playlist) => {
    const actions: Record<DropdownPlaylist, () => void> = {
      delete: () => deletePlaylistMutation.mutate(String(playlist.id)),
      edit: () => console.log('edit'),
      share: () => console.log('share'),
    }

    actions[option]()
  }

  return {
    deletePlaylistMutation: deletePlaylistMutation.mutateAsync,
    playlistOptions,
    handlePlaylistAction,
  }
}
