<script setup lang="ts">
import { useTrackStore } from '@/stores/trackStore.ts'
import { computed } from 'vue'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'

const store = useTrackStore()
const currentTrackName = computed(() => store.activeTrack?.name)
const currentAlbumName = computed(() => store.activeAlbum?.name)
const currentCover = computed(() => store.activeAlbum?.albumCover)

</script>

<template>
  <div class="bg-neutral-950 flex items-center justify-between w-[calc(100%-240px)] fixed bottom-0 h-20">
    <div class="flex items-center p-2 pl-5">
      <img
        v-if="currentCover"
        class="w-14 h-14 rounded-xl object-cover"
        :src="currentCover"
        alt="cover"
      />
      <div class="ml-3">
        <p class="text-white text-sm">{{ currentTrackName }}</p>
        <p class="text-gray-400 text-xs">{{ currentAlbumName }}</p>
      </div>
    </div>

    <div class="flex items-center flex-col">
      <div class="gap-7 flex pb-3">
        <button @click="store.toggleShuffle()">
          <img :src="store.isShuffled ?  '/images/icons/shuffle-active.png' : '/images/icons/shuffle-inactive.png' "
               class="w-5 h-5 cursor-pointer"
               :class="{ 'filter invert': !store.isShuffled }"
               alt="#!">
        </button>

        <button @click="store.previousTrack()">
          <img
            src="/images/icons/forward-button.png"
            alt="play"
            class="rotate-180 w-5 h-5 filter invert cursor-pointer">
        </button>

        <button
          @click="store.togglePlayPause()"
          class="w-10 h-10 rounded-full bg-white hover:scale-110 flex items-center justify-center transition-transform cursor-pointer">
          <img
            :src="store.isPlaying ? '/images/icons/pause.png' : '/images/icons/play-button-arrowhead.png'"
            alt="#!"
            class="w-5 h-5">
        </button>

        <button @click="store.nextTrack()">
          <img src="/images/icons/forward-button.png" alt="play" class="w-5 h-5 filter invert cursor-pointer">
        </button>

        <button @click="store.repeatTrack()">
          <img src="/images/icons/repeat.png" class="w-5 h-5 filter invert cursor-pointer" alt="#!">
        </button>
      </div>

      <div class="flex items-center gap-3 w-[400px]">
        <span class="text-gray-400 text-xs w-10 text-right">
          {{ secondsToMinutes(store.currentTime) }}
        </span>

        <input
          type="range"
          min="0"
          :max="store.duration"
          step="0.1"
          :value="store.currentTime"
          @input="store.seekTo(($event.target as HTMLInputElement).valueAsNumber)"
          class="w-full h-1 rounded-full accent-green-400 cursor-pointer"
        />

        <span class="text-gray-400 text-xs w-10 text-left">
          {{ secondsToMinutes(store.duration) }}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button
        @click="store.toggleMute()"
        class="hover:scale-110 transition-transform cursor-pointer">
        <img
          :src="store.muted ? '/images/icons/mute.png' : '/images/icons/volume.png'"
          class="w-5 h-5 filter invert"
          alt="volume">
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="store.volume"
        @input="store.setVolume(($event.target as HTMLInputElement).valueAsNumber)"
        class="w-25 h-1 rounded-full accent-white cursor-pointer"
      />
    </div>

  </div>
</template>
