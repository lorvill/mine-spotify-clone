<script setup lang="ts">
import TheDropdown from '@/components/ui/dropdowns/TheDropdown.vue'
import type { Playlist } from '@/types/playlist'
import TheDropdownItem from '@/components/ui/dropdowns/TheDropdownItem.vue'
import { useConfirmDialog } from '@vueuse/core'
import { usePlaylistDropdown } from '@/composables/usePlaylistDropdown.ts'
import { ref } from 'vue'
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal.vue'
import EditPlaylistModal from '@/components/ui/EditPlaylistModal.vue'

defineProps<{ playlist: Playlist }>()

const {
  isRevealed: isDeleteOpen,
  reveal: revealDelete,
  confirm: confirmDelete,
  cancel: cancelDelete,
  onReveal,
} = useConfirmDialog()

const {
  isRevealed: isEditOpen,
  reveal: revealEdit,
  confirm: confirmEdit,
  cancel: cancelEdit,
} = useConfirmDialog()

const { deletePlaylistMutation, editPlaylistMutation } = usePlaylistDropdown()
const isOpened = ref(false)
const selectedPlaylist = ref<Playlist | null>(null)

onReveal((data) => {
  selectedPlaylist.value = data
})

async function openDeleteConfirm(playlist: Playlist) {
  isOpened.value = false

  const { data: isConfirmed } = await revealDelete(playlist)
  if (isConfirmed) {
    deletePlaylistMutation.mutate(playlist.id as string)
  }

  selectedPlaylist.value = null
}

async function openEditModal(playlist: Playlist) {
  isOpened.value = false
  selectedPlaylist.value = playlist

  const { data } = await revealEdit()
  if (data) {
    editPlaylistMutation.mutate(data)
  }

  selectedPlaylist.value = null
}
</script>

<template>
  <the-dropdown v-model="isOpened">
    <the-dropdown-item @click.stop="openEditModal(playlist)">Edit</the-dropdown-item>
    <the-dropdown-item @click.stop="openDeleteConfirm(playlist)">Delete</the-dropdown-item>
  </the-dropdown>

  <delete-confirmation-modal
    :selected-playlist="selectedPlaylist"
    :is-revealed="isDeleteOpen"
    @confirm="confirmDelete(true)"
    @cancel="cancelDelete"
  />

  <edit-playlist-modal
    :selected-playlist="selectedPlaylist"
    :is-revealed="isEditOpen"
    @confirm="(data) => confirmEdit(data)"
    @cancel="cancelEdit"
  />
</template>
