<script setup lang="ts">
import { useTrackStore } from '@/stores/trackStore.ts'
import { computed } from 'vue'

const store = useTrackStore()
const currentTrackName = computed(() => store.activeTrack?.name)
const currentAlbumName = computed(() => store.activeAlbum?.name)
const currentCover = computed(() => store.activeAlbum?.albumCover)
const currentTrackIndex = computed(() => store.activeTrackIndex)

</script>

<template>
  <div class="bg-neutral-950 flex items-center justify-between w-[calc(100%-240px)] fixed bottom-0 h-20">
    <div class="flex items-center p-2 pl-5">
      <img
        class="w-14 h-14 rounded-xl object-cover"
        :src="currentCover"
        alt="track cover"
      />
      <div class="ml-3">
        <p class="text-white text-sm">{{ currentTrackName }}</p>
        <p class="text-gray-400 text-xs">{{ currentAlbumName }}</p>
      </div>
    </div>

    <div class="flex items-center flex-col">
      <div class="gap-7 flex pb-4">
        <button><img src="/images/icons/shuffle.png" class="w-5 h-5 filter invert cursor-pointer"></button>

        <button @click="store.previousTrack()">
          <img
            src="/images/icons/forward-button.png"
            alt="play"
            class="rotate-180 w-5 h-5 filter invert cursor-pointer">
        </button>

        <button
          @click="store.toggleTrack()"
          class="w-10 h-10 rounded-full bg-white hover:scale-110 flex items-center justify-center transition-transform cursor-pointer">
          <img
            :src="store.isPlaying ? '/images/icons/pause.png' : '/images/icons/play-button-arrowhead.png'"
            alt="#!"
            class="w-5 h-5">
        </button>

        <button @click="store.nextTrack()">
          <img src="/images/icons/forward-button.png" alt="play" class="w-5 h-5 filter invert cursor-pointer">
        </button>

        <button @click="store.repeatTrack()"><img src="/images/icons/repeat.png" class="w-5 h-5 filter invert cursor-pointer"></button>
      </div>

      <div class="progress-bar">
        <div class="progress-fill">
        </div>
      </div>
    </div>
    <button>
      <img src="/images/icons/play-button-arrowhead.png" alt="play" class="w-10 h-10 filter invert">
    </button>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 30rem;
  height: 4px;
  background-color: #282828;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #fff;
  transition: width 0.3s ease-in-out;
}

</style>
