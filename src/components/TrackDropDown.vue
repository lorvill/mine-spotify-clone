<script setup lang="ts">
import TheDropDown from '@/components/ui/TheDropDown.vue'
import type { Option } from '@/types/option.ts'
import { usePlaylistQuery } from '@/queries/usePlaylistQuery.ts'
import { computed } from 'vue'

const { data } = usePlaylistQuery()

const options = computed(() => {
  const playlists = data.value ?? []

  const addToPlaylistOption = {
    option: 'add',
    name: 'Add to Playlist',
    children: playlists.map((playlist: any) => ({
      option: `playlist-${playlist.id}`,
      name: playlist.name,
    })),
  }

  return [
    addToPlaylistOption,
    { option: 'share', name: 'Share' },
  ] as Option[]
})


</script>

<template>
  <div @click.stop>
    <TheDropDown
      :options
      @select="console.log"
    />
  </div>
</template>

<style scoped></style>