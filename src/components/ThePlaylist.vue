<script setup lang="ts">
import { useSelectAlbumQuery } from '@/queries/useSelectAlbumQuery.ts'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useTrackStore } from '@/stores/trackStore.ts'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'
import DropDownMenu from './DropDownMenu.vue'
import ThePlayer from '@/components/ThePlayer.vue'
import { usePlaylist } from '@/composables/usePlaylist.ts'

const store = useTrackStore()
const route = useRoute()
</script>

<template>
  <div class="w-[calc(100%-240px)] fixed right-0 h-screen bg-neutral-900 bg-gradient-to-b ">
    <div class="p-8 flex-col overflow-auto max-h-[calc(100vh-60px)] bg-gradient-to-">
      <div class="flex items-end gap-6 mb-0">

      <!-- img -->

        <div class="flex flex-col gap-4">
          <p class="text-white font-light">Private Playlist</p>
          <h2 class="text-[70px] font-bold text-white leading-none">Liked Songs</h2>
        </div>
      </div>

      <div
        v-if="store.activeTrack"
        class="fixed bottom-0 w-[calc(100%-240px)]"
      >
        <ThePlayer />
      </div>
    </div>

    <div class="p-5 pl-0 flex items-center gap-4 ml-10">
      <button
        class="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md cursor-pointer"
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
  </div>
</template>

<style scoped></style>
