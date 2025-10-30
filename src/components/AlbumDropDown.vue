<script setup lang="ts">
import TheDropDown from '@/components/ui/TheDropDown.vue'
import type { Track } from '@/types/track.ts'
import { useSelectAlbumQuery } from '@/queries/useSelectAlbumQuery.ts'
import { useLikedTracks } from '@/composables/useLikedTracks.ts'
import TheToast from '@/components/ui/TheToast.vue'
import { ref } from 'vue'

type Option = { option: string; name: string }

const toast = ref<InstanceType<typeof TheToast>>()
const props = defineProps<{ track: Track }>()
const { useSelectAlbumQuery } = useSelectAlbumQuery()
const { addLikedTracksMutation, removeLikedTracksMutation, likedTracksQuery } = useLikedTracks()

const options: Option[] = [
  { option: 'add', name: 'Add to Liked Songs' },
  { option: 'remove', name: 'Remove from Liked Songs' },
  { option: 'share', name: 'Share' }
]

function handleSelect(option: Option) {
  const isLiked = likedTracksQuery.data.value?.some(track => track.id === props.track.id)

  if (option.option === 'add') {
    if (isLiked) return toast.value?.showToast('Song is already added')

    addLikedTracksMutation.mutate(props.track)
    toast.value?.showToast('Added to Liked Songs')
  } else if (option.option === 'remove') {
    removeLikedTracksMutation.mutate(props.track)
    toast.value?.showToast('Removed from Liked Songs')
  } else if (option.option === 'share') {
    toast.value?.showToast('Share feature coming soon')
  }
}
</script>

<template>
  <TheToast ref="toast" />
  <TheDropDown
    :options="options"
    @select="handleSelect"
  />
</template>

<style scoped></style>
