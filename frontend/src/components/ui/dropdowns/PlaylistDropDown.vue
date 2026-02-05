<script setup lang="ts">
import TheDropDown from '@/components/ui/dropdowns/TheDropDown.vue'
import type { Option } from '@/types/option.ts'
import { usePlaylist } from '@/composables/usePlaylist.ts'

const emit = defineEmits(['delete'])
const options = () => {
  const { deletePlaylistMutation } = usePlaylist()

  const deletePlaylist: Option = {
    option: deletePlaylistMutation,
    name: 'Delete',
  }

  emit('delete', deletePlaylist)

  return {
    deletePlaylist,
  }
}

const { deletePlaylist } = options()
const menuOptions = [deletePlaylist]
</script>

<template>
  <TheDropDown
  :options="menuOptions"
  />
</template>

<style scoped></style>
