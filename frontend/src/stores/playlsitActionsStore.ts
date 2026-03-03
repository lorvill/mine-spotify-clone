import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Playlist } from '@/types/playlist.ts'
import { usePlaylistDropdown } from '@/composables/usePlaylistDropdown.ts'

export const usePlaylistActions = defineStore('playlist', () => {
  const { deletePlaylistMutation, editPlaylistMutation } = usePlaylistDropdown()

  const isConfirmationModalOpened = ref(false)
  const selectedPlaylist = ref<Playlist | null>(null)
  const isEditModalOpened = ref(false)

  function openDeleteModal(playlist: Playlist) {
    selectedPlaylist.value = playlist
    isConfirmationModalOpened.value = true
  }

  function confirmDelete() {
    if (selectedPlaylist.value) {
      deletePlaylistMutation.mutate(selectedPlaylist.value.id as string)
      isConfirmationModalOpened.value = false
    }
  }

  function closeDeleteModal() {
    if (!deletePlaylistMutation.isPending.value) {
      isConfirmationModalOpened.value = false
    }
  }

  function confirmEdit() {
    if (selectedPlaylist.value) {
      editPlaylistMutation.mutate(selectedPlaylist.value)
    }
  }

  function openEdit(playlist: Playlist) {
    selectedPlaylist.value = playlist
    isEditModalOpened.value = true
  }

  return {
    isConfirmationModalOpened,
    selectedPlaylist,
    isEditModalOpened,
    confirmDelete,
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
    confirmEdit,
    openEdit
  }
})