<script setup lang="ts">
import { useSelectAlbumQuery } from '@/composables/useSelectAlbumQuery.ts'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useTrackStore } from '@/stores/trackStore.ts'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'
import DropDownMenu from './DropDownMenu.vue'
import ThePlayer from '@/components/ThePlayer.vue'

const store = useTrackStore()
const route = useRoute() // получаем объект текущего маршрута
const albumId = route.params.id as string // говорим что albumId это точно строка (если например в url - /album/123, то  albumId = '123' )
const { data: album, isLoading: isAlbumLoading, error: albumError } = useSelectAlbumQuery(albumId)
const hoverIndex = ref<number | null>(null) // хранит индекс трека: если наведено например на "2", то значит мышь наведена на третий трек
</script>

<template>
  <div class=" w-[calc(100%-240px)] fixed right-0 h-screen bg-neutral-900">
    <div v-if="isAlbumLoading" class="text-gray-400 text-center mt-20">Loading...</div>
    <div v-else-if="albumError" class="text-red-500 text-center mt-20">Failed to load data</div>

    <div v-else-if="album" class="p-8 overflow-auto">
      <div class="flex items-center gap-6 mb-6">
        <img :src="album.albumCover" alt="cover" class="w-40 h-40 rounded-md shadow-lg" />
        <div>
          <h2 class="text-2xl font-bold text-white">{{ album.name }}</h2>
          <p class="text-gray-400 mt-1">{{ album.releaseYear }}</p>
        </div>
      </div>

      <ul class="space-y-1">
        <li
          v-for="(track, index) in album?.tracks || []"
          :key="track.id"
          class="flex items-center justify-between p-2 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
          @click="store.toggleTrack(album.tracks[index], index, album)"
        >

          <div class="w-4 h-4 flex items-center justify-center">
            <button v-if="hoverIndex === index">
              <img
                class="filter invert cursor-pointer"
                :src="
                  store.activeTrack?.id === track.id
                    ? '/images/icons/pause.png'
                    : '/images/icons/play-button-arrowhead.png'
                "
                alt="play/stop"
              />
            </button>
            <span v-else class="text-neutral-400">{{ index + 1 }}</span>
          </div>

          <div class="flex-1 ml-4">
            <p class="text-white font-medium truncate">{{ track.name }}</p>
            <p class="text-neutral-400 text-sm truncate">{{ album.name }}</p>
          </div>


          <DropDownMenu v-if="hoverIndex === index" />

          <span class="text-neutral-400 text-sm">{{ secondsToMinutes(track.duration) }}</span>
        </li>
      </ul>
    </div>

    <div>
      <ThePlayer />
    </div>

  </div>
</template>

<style scoped>

</style>
