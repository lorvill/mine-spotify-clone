<script setup lang="ts">
import TheDropDown from '@/components/ui/dropdowns/TheDropDown.vue'
import type { Playlist } from '@/types/playlist.ts'
import type { Option } from '@/types/option.ts'
import { usePlaylistQuery } from '@/queries/usePlaylistQuery.ts'
import { computed } from 'vue'
import type { Track } from '@/types/track.ts'

defineProps<{ track: Track }>()
// const { data } = usePlaylistQuery()
const options = computed(() => {
  const playlists = data.value ?? []

  const addToPlaylistOption = {
    option: 'add',
    name: 'Add to Playlist',
    children: playlists.map((playlist: Playlist) => ({
      option: `playlist-${playlist.id}`,
      name: playlist.title,
    })),
  }

  const sharePlaylistOption = {
    option: 'share',
    name: 'Share'
  }

  return [addToPlaylistOption, sharePlaylistOption] as Option[]
})
</script>

<template>
  <div @click.stop>
    <TheDropDown
      :options
      @select="console.log('selected')"
    />
  </div>
</template>