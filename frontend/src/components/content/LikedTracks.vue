<script setup lang="ts">
import { ref } from 'vue'
import { useTrackStore } from '@/stores/trackStore.ts'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'
import ThePlayer from '@/components/ui/ThePlayer.vue'
import { useLikedTracks } from '@/composables/useLikedTracks.ts'
import TrackDropDown from '@/components/ui/TrackDropDown.vue'

const { likedTracksQuery } = useLikedTracks()
const trackStore = useTrackStore()
const hoverIndex = ref<number | null>(null)

console.log(likedTracksQuery.data.value)
</script>
<template>
  <div class="w-[calc(100%-240px)] fixed right-0 h-screen flex flex-col">

    <div class="p-8 flex-col flex-shrink-0 bg-gradient-to-b from-[#6143b5]/90 to-[#3f2b78]/70">
      <div class="flex items-end gap-6 mb-0">
        <img
          src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
          alt="cover"
          class="w-[200px] h-[200px] rounded-md shadow-2xl shadow-black/70"
        />
        <div class="flex flex-col gap-4">
          <p class="text-white font-light">Private Playlist</p>
          <h2 class="text-[70px] font-bold text-white leading-none">Liked Songs</h2>
        </div>
      </div>

    </div>

    <div
      class="flex-1 overflow-y-auto p-8 pt-0 bg-gradient-to-b from-[#27234d]/80 to-[#594d78]/10"
    >

      <div class="p-5 pl-0 flex items-center gap-4 ">
        <button
          class="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer"
          @click="trackStore.playTracksList(likedTracksQuery.data.value)"
        >
          <img
            :src="trackStore.isPlaying ? '/images/icons/pause.png' : '/images/icons/play-button-arrowhead.png'"
            alt="play"
            class="w-4 h-4"
          />
        </button>

        <button class="flex items-center justify-center active:scale-105" @click="trackStore.toggleShuffle()">
          <img
            :src="trackStore.isShuffled ? '/images/icons/shuffle-active.png' : '/images/icons/shuffle-inactive.png'"
            alt="shuffle"
            class="w-8 h-8 cursor-pointer"
            :class="{ 'filter invert': !trackStore.isShuffled }"
          />
        </button>

      </div>

      <hr class="w-full h-px bg-neutral-700 border-0 dark:bg-neutral-700 mb-5">
      <ul v-if="likedTracksQuery?.data.value">
        <li
          v-for="(track, index) in likedTracksQuery.data.value"
          :key="track.id"
          class="flex items-center justify-between p-2 rounded-md hover:bg-neutral-200/10 transition-colors cursor-pointer"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
          @click="trackStore.togglePlayPause(track, index, likedTracksQuery.data.value)"
        >
          <div class="w-4 h-4 flex items-center justify-center">
            <button v-if="hoverIndex === index">
              <img
                class="filter invert cursor-pointer"
                :src="trackStore.isPlaying ? '/images/icons/pause.png' : '/images/icons/play-button-arrowhead.png'"
                alt="play/stop"
              />
            </button>
            <span v-else class="text-neutral-400">{{ index + 1 }}</span>
          </div>

          <div class="flex-1 ml-4">
            <p class="text-white font-medium truncate">{{ track.name }}</p>
            <p class="text-neutral-400 text-sm truncate">Liked Songs</p>
          </div>

          <TrackDropDown
            v-if="hoverIndex === index"
          />

          <span class="text-neutral-400 text-sm">{{ secondsToMinutes(track.duration) }}</span>
        </li>
      </ul>
    </div>

    <transition
      enter-active-class="transition-opacity duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div v-if="trackStore.activeTrack" class="fixed bottom-0 w-[calc(100%-240px)]">
        <ThePlayer />
      </div>
    </transition>
  </div>
</template>