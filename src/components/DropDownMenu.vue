<script setup lang="ts">
import { ref } from 'vue'
import type { Track } from '@/types/track.ts'
import { useLikedTracks } from '@/composables/useLikedTracks.ts'
import { useDropDownStore } from '@/stores/dropdownStore.ts'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'

type Option = {
  option: string,
  name: string
}

const props = defineProps<{ track: Track }>()
const { addLikedTracksMutation, removeLikedTracksMutation } = useLikedTracks()
const options: Option[] = [
  { option: 'add', name: 'Add to Liked Songs' },
  { option: 'remove', name: 'Remove from Liked Songs' },
  { option: 'share', name: 'Share' }
]
let selectedOption = ref<Option | null>(null)
let isOpenedMenu = ref(false)

function toggleDropdown() {
  isOpenedMenu.value = !isOpenedMenu.value
}

function selectOption(option: Option) {
  selectedOption.value = option
}

function handleTrack() {
  if (!props.track) return
  if (selectedOption.value?.option === 'add') {
    addLikedTracksMutation.mutate(props.track)
  } else if (selectedOption.value?.option === 'remove') {
    removeLikedTracksMutation.mutate(props.track)
  }

  isOpenedMenu.value = false
}
</script>

<template>
  <div class="relative inline-block text-left mr-2">

    <button
      @click.stop="toggleDropdown"
      class="p-1"
    >
      <img
        src="/images/icons/dots.png"
        alt="menu"
        class="w-6 h-6 invert cursor-pointer rotate-90"
      >
    </button>

    <div
      v-if="isOpenedMenu"
      class="absolute right-0 mt-0 w-50 origin-top-right rounded-xl bg-neutral-700 shadow-lg"
    >
      <ul class="py-1">
        <li
          v-for="option in options"
          :key="option.option"
          @click="() => { selectOption(option); handleTrack() }"
          class="px-4 py-2 text-sm text-white hover:bg-neutral-600 rounded-xl cursor-pointer transition"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
