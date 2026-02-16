import {useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiPlaylists } from '@/api/playlists.ts'
import type { Option } from '@/types/option.ts'
import type { DropdownPlaylist } from '@/types/dropdownActions.ts'
import type { Playlist } from '@/types/playlist.ts'
import { playlistKeys } from '@/utils/queryKeysFactory.ts'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const isConfirmationModalOpened = ref(false)
const selectedPlaylist = ref<Playlist | null>(null)
const toast = useToast()

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
      isConfirmationModalOpened.value = false
      toast.success('Playlist deleted successfully.')
    },
    onError: () => {
      toast.error('Error while deleting playlist')
    }
  })

  const playlistOptions: Option<DropdownPlaylist>[] = [
    { option: 'edit', name: 'Edit' },
    { option: 'share', name: 'Share' },
    { option: 'delete', name: 'Delete' },
  ]

  const handlePlaylistAction = (option: DropdownPlaylist, playlist: Playlist) => {
    if (option === 'delete') {
      selectedPlaylist.value = playlist
      isConfirmationModalOpened.value = true
    } else {
      const actions: Record<Exclude<DropdownPlaylist, 'delete'>,  () => void> = {
        edit: () => console.log('edit'),
        share: () => console.log('share'),
      }

      actions[option]()
    }
  }

  const confirmDelete = () => {
    if (selectedPlaylist.value) {
      deletePlaylistMutation.mutate(String(selectedPlaylist.value.id))
    }
  }

  return {
    deletePlaylistMutation: deletePlaylistMutation.isPending,
    playlistOptions,
    handlePlaylistAction,
    confirmDelete,
    isConfirmationModalOpened,
    selectedPlaylist,
  }
}
