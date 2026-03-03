<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTrackStore } from '@/stores/trackStore.ts'
import { useSelectAlbumQuery } from '@/queries/useSelectAlbumQuery.ts'
import ThePlayer from '@/components/ui/ThePlayer.vue'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'

const store = useTrackStore()
const route = useRoute()
const albumId = route.params.id as string
const { data: album, isLoading: isAlbumLoading, error: albumError } = useSelectAlbumQuery(albumId)
const hoverIndex = ref<number | null>(null)
</script>

<template>
    <div v-if="isAlbumLoading" class="text-gray-400 text-center mt-20">Loading...</div>
    <div v-else-if="albumError" class="text-red-500 text-center mt-20">Failed to load data</div>

    <div v-else-if="album" class="p-8 flex-col">
      <div class="flex items-center gap-6 mb-0">
        <img :src="album.albumCover" alt="cover" class="w-40 h-40 rounded-md shadow-lg" />
        <div class="flex-col">
          <h2 class="text-2xl font-bold text-white">{{ album.name }}</h2>
          <p class="text-gray-400 mt-1">{{ album.releaseYear }}</p>
        </div>
      </div>

      <div class="p-5 pl-0 flex items-center gap-4">
        <button
          class="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer"
          @click="store.playPlaylist(album)"
        >
          <img
            :src="store.isPlaying ? '/images/icons/pause.png' : '/images/icons/play-button-arrowhead.png'"
            alt="play"
            class="w-4 h-4"
          />
        </button>

        <button class="flex items-center justify-center active:scale-105" @click="store.toggleShuffle()">
          <img
            :src="store.isShuffled ? '/images/icons/shuffle-active.png' : '/images/icons/shuffle-inactive.png'"
            alt="shuffle"
            class="w-8 h-8 cursor-pointer"
            :class="{ 'filter invert': !store.isShuffled }"
          />
        </button>
      </div>

      <ul>
        <li
          v-for="(track, index) in album.tracks"
          :key="track.id"
          class="flex items-center justify-between p-2 rounded-md hover:bg-neutral-800  transition-colors cursor-pointer"
          :class="{ 'is-hovered': hoverIndex === index }"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
          @click="store.togglePlayPause(track, index, album.tracks, album)"
        >
            <div class="w-4 h-4 flex items-center justify-center relative">
              <span class="track-number text-neutral-400">{{ index + 1 }}</span>
              <button
                class="play-pause-button"
                :class="{ 'is-playing': store.isPlaying, 'is-hovered': hoverIndex === index }"
              >
                <img
                  class="filter invert cursor-pointer w-full h-full"
                  src="/images/icons/play-button-arrowhead.png"
                />
                <img
                  class="filter invert cursor-pointer w-full h-full"
                  src="/images/icons/pause.png"
                />
              </button>
            </div>


          <div class="flex-1 ml-4">
            <p class="text-white font-medium truncate">{{ track.name }}</p>
            <p class="text-neutral-400 text-sm truncate">{{ album.name }}</p>
          </div>

<!--          <div class="relative">-->
<!--            <TrackDropDown-->
<!--              :track="track"-->
<!--              @click.stop="openDropdownIndex = openDropdownIndex === index ? null : index"-->
<!--            />-->
<!--          </div>-->
          <span class="text-neutral-400 text-sm">{{ secondsToMinutes(track.duration) }}</span>
        </li>
      </ul>
    </div>

    <transition
      enter-active-class="transition-opacity duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div v-if="store.activeTrack" class="fixed bottom-0 ">
        <ThePlayer />
      </div>
    </transition>
</template>

<style scoped>
.track-number {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

li.is-hovered .track-number {
  opacity: 0;
}

.play-pause-button {
  inset: 0;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-pause-button img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
}

.play-pause-button img:first-child {
  opacity: 1;
}

.play-pause-button.is-hovered {
  opacity: 1;
}

.play-pause-button.is-hovered.is-playing img:first-child {
  opacity: 0;
}
.play-pause-button.is-hovered.is-playing img:last-child {
  opacity: 1;
}
</style>
