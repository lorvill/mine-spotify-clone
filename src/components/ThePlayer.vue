<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSelectAlbumQuery } from '@/composables/useSelectAlbumQuery.ts'
import { useTrackStore } from '@/stores/trackStore.ts'

const route = useRoute()
const albumId = route.params.id as string
const { data: album } = useSelectAlbumQuery(albumId)
const store = useTrackStore()
</script>

<template>
  <div class="bg-neutral-950 flex items-center justify-between w-[calc(100%-240px)] fixed bottom-0 h-20">
    <div class="flex items-center p-2 pl-5">
      <img
        class="w-14 h-14 rounded-xl object-cover"
        :src="album?.albumCover"
        alt="track cover"
      />
      <div class="ml-3">
        <p class="text-white text-sm">{{ album?.name }}</p>
        <p class="text-gray-400 text-xs">{{ album?.name }}</p>
      </div>
    </div>

    <div class="flex items-center flex-col">
      <div class="gap-10 flex pb-4">
        <button @click="store.playTrack()">
          <img
            src="/images/icons/forward-button.png"
            alt="play"
            class="rotate-180 w-5 h-5 filter invert cursor-pointer">
        </button>
        <button>
          <img src="/images/icons/play-button-arrowhead.png" alt="play" class="w-5 h-5 filter invert cursor-pointer">
        </button>
        <button>
          <img src="/images/icons/forward-button.png" alt="play" class="w-5 h-5 filter invert cursor-pointer">
        </button>
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
