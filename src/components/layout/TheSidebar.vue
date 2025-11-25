<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import CreatePlaylistModal from '@/components/ui/CreatePlaylistModal.vue'
import { ref, useTemplateRef } from 'vue'
import { usePlaylistQuery } from '@/queries/usePlaylistQuery.ts'

const route = useRoute()
const modalWindow = useTemplateRef('modalWindow')
const { data } = usePlaylistQuery()

function isActive(path: string) {
  return route.path === path
}

console.log(data)
</script>

<template>
  <div class="h-[100%] p-6 w-[240px] fixed bg-black">
    <RouterLink to="/">
      <img width="125" src="/images/icons/spotify-logo.png" />
    </RouterLink>

    <ul class="mt-10">
      <RouterLink
        to="/"
        class="flex items-center gap-3 mb-4 hover:grayscale hover:brightness-150 transition duration-30"
      >
        <img
          width="23"
          src="/images/icons/home-inactive.png"
          :class="isActive('/') ? 'grayscale brightness-150' : 'grayscale brightness-75'"
        />
        <span
          class="font-medium text-[15px] text-gray-400"
          :class="isActive('/') ? 'grayscale brightness-150' : 'text-gray-400'"
        >
          Home
        </span>
      </RouterLink>

      <RouterLink
        to="/library"
        class="flex items-center gap-3 mb-10 hover:grayscale hover:brightness-150 transition duration-30"
      >
        <img
          width="23"
          src="/images/icons/library-inactive.png"
          :class="isActive('/library') ? 'grayscale brightness-150' : 'grayscale brightness-75'"
        />
        <span
          class="font-medium text-[15px] text-gray-400"
          :class="isActive('/library') ? 'grayscale brightness-150' : 'text-gray-400'"
        >
          Library
        </span>
      </RouterLink>

      <button
        class="flex items-center gap-3 mb-4 hover:grayscale hover:brightness-150 transition duration-30 cursor-pointer"
        @click="modalWindow?.openModal()"
      >
        <img width="30" src="/images/icons/playlist-inactive.png" />
        <span class="font-medium text-[15px] text-gray-400">Create Playlist</span>
        <CreatePlaylistModal ref="modalWindow" />
      </button>

      <RouterLink
        to="/liked-songs"
        class="flex items-center gap-3 mb-4 hover:grayscale hover:brightness-150 transition duration-30"
      >
        <img width="30" src="/images/icons/liked-inactive.png" />
        <span class="font-medium text-[15px] text-gray-400">Liked Songs</span>
      </RouterLink>
    </ul>

    <hr class="border-b border-b-gray-700 mt-2" />

    <ul class="mt-10" v-if="data">
      <li v-for="playlist in data ?? []" :key="playlist.id" class="text-neutral-300 text-[15px] hover:text-white mb-2 cursor-pointer">
        <RouterLink :to="`/playlist/${playlist.id}`">
          {{ playlist.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
