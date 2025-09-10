<script setup lang="ts">
import { useSelectAlbumQuery} from '@/composables/useSelectAlbumQuery.ts'
import { useRoute } from 'vue-router'

const route = useRoute()
const albumId = route.params.id as string
const { data: album, isLoading: isAlbumLoading, error: albumError } = useSelectAlbumQuery(albumId)
console.log(albumId)
</script>

<template>
  <div class="w-[calc(100%-240px)] fixed right-0 h-screen">
    <div v-if="isAlbumLoading" class="text-gray-400">Loading...</div>
    <div v-else-if="albumError" class="text-white">Failed to load data</div>
    <div v-else-if="album">
      <img :src="album.albumCover" alt="cover" class="w-32 h-32" />
      <h2>{{ album.name }}</h2>
      <p>{{ album.releaseYear }}</p>

      <ul>
        <li v-for="track in album.tracks" :key="track.id">
          {{ track.id }} {{ track.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
