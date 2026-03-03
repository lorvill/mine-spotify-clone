<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTrackStore } from '@/stores/trackStore.ts'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'
import ThePlayer from '@/components/ui/ThePlayer.vue'
import { usePlaylistQuery } from '@/queries/usePlaylistQuery.ts'
import FileImageInput from '@/components/ui/FileImageInput.vue'

const route = useRoute()
const trackStore = useTrackStore()
const imageFile = ref<File | null>(null)
const playlistId = route.params.id

const { data, error, isLoading } = usePlaylistQuery(playlistId)
const playlistTitle = computed(() => {
  return data.value?.title
})
</script>

<template>
  <div class="min-h-full flex flex-col">
    <div class="p-8 flex-col flex-shrink-0 bg-gradient-to-b from-[#737373]/90 to-[#4a4a4a]/70">

      <div class="flex items-end gap-6 mb-0">
        <file-image-input v-model="imageFile" />
        <div class="flex flex-col gap-4">
          <p class="text-white text-sm">Playlist</p>
          <h2 class="text-[70px] font-bold text-white leading-none">{{ playlistTitle }}</h2>
        </div>
      </div>
    </div>

    <div class="flex-1 p-8 pt-0 bg-gradient-to-b from-[#303030]/80 to-[#1c1c1c]/10">
      <div class="p-5 pl-0 flex items-center gap-4">
        <button
          class="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer"
          @click="trackStore.playTracksList(data)"
        >
          <img
            :src="
              trackStore.isPlaying
                ? '/images/icons/pause.png'
                : '/images/icons/play-button-arrowhead.png'
            "
            alt="play"
            class="w-4 h-4"
          />
        </button>

        <button
          class="flex items-center justify-center active:scale-105"
          @click="trackStore.toggleShuffle()"
        >
          <img
            :src="
              trackStore.isShuffled
                ? '/images/icons/shuffle-active.png'
                : '/images/icons/shuffle-inactive.png'
            "
            alt="shuffle"
            class="w-8 h-8 cursor-pointer"
            :class="{ 'filter invert': !trackStore.isShuffled }"
          />
        </button>
      </div>

      <hr class="w-full h-px bg-neutral-700 border-0 dark:bg-neutral-700 mb-5" />
      <!--      <ul v-if="data.value">-->
      <!--        <li-->
      <!--          v-for="(track, index) in data.value"-->
      <!--          :key="track.id"-->
      <!--          class="flex items-center justify-between p-2 rounded-md hover:bg-neutral-200/10 transition-colors cursor-pointer"-->
      <!--          @mouseenter="hoverIndex = index"-->
      <!--          @mouseleave="hoverIndex = null"-->
      <!--          @click="trackStore.togglePlayPause(track, index, data.value)"-->
      <!--        >-->
      <!--          <div class="w-4 h-4 flex items-center justify-center">-->
      <!--            <button v-if="hoverIndex === index">-->
      <!--              <img-->
      <!--                class="filter invert cursor-pointer"-->
      <!--                :src="-->
      <!--                  trackStore.isPlaying-->
      <!--                    ? '/images/icons/pause.png'-->
      <!--                    : '/images/icons/play-button-arrowhead.png'-->
      <!--                "-->
      <!--                alt="play/stop"-->
      <!--              />-->
      <!--            </button>-->
      <!--            <span v-else class="text-neutral-400">{{ index + 1 }}</span>-->
      <!--          </div>-->

      <!--          <div class="flex-1 ml-4">-->
      <!--            <p class="text-white font-medium truncate">{{ track.name }}</p>-->
      <!--            <p class="text-neutral-400 text-sm truncate"></p>-->
      <!--          </div>-->

      <!--          <span class="text-neutral-400 text-sm">{{ secondsToMinutes(track.duration) }}</span>-->
      <!--        </li>-->
      <!--      </ul>-->
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
