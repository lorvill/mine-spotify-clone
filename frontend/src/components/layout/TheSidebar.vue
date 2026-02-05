<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import CreatePlaylistModal from '@/components/ui/CreatePlaylistModal.vue'
import { useTemplateRef } from 'vue'
import { useAllPlaylistsQuery } from '@/queries/usePlaylistQuery.ts'
import TheDropDown from '@/components/ui/dropdowns/TheDropDown.vue'
import PlaylistDropDown from '@/components/ui/dropdowns/PlaylistDropDown.vue'
import { usePlaylist } from '@/composables/usePlaylist.ts'

const route = useRoute()
const modalWindow = useTemplateRef('modalWindow')
const { data } = useAllPlaylistsQuery()

const { deletePlaylistMutation } = usePlaylist()

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="h-[100%] p-5 w-[300px] fixed bg-black">
    <RouterLink to="/">
      <img width="110" src="/images/icons/spotify-logo.png" />
    </RouterLink>

    <div class="mt-10 pl-2 flex items-center justify-between">
      <RouterLink
        to="/library"
        class="flex items-center gap-1.5"
        :class="isActive('/library') ? 'active' : ''"
        title="Library"
      >
        <img
          width="20"
          class="invert-100"
          src="/images/icons/music-album.png"
          :class="isActive('/library') ? 'brightness-150' : 'brightness-75'"
        />
        <span class="font-bold text-[15px]">Your Library</span>
      </RouterLink>

      <button class="create rounded-full font-bold text-white" @click="modalWindow?.openModal()">
        <img width="14" src="/images/icons/plus.png" class="invert-100" />
        <span>Create</span>
        <CreatePlaylistModal ref="modalWindow" />
      </button>
    </div>

    <ul class="mt-7">
      <RouterLink
        to="/liked-songs"
        class="sidebar-item mb-2"
        :class="isActive('/liked-songs') ? 'active' : ''"
      >
        <img width="40" src="/images/icons/liked-inactive.png" />
        <div class="flex-col flex">
          <span class="text-[15px]">Liked Songs</span>
          <span class="text-[12px]">Playlist</span>
        </div>
      </RouterLink>
    </ul>

    <ul v-if="Array.isArray(data)">
      <li v-for="playlist in data" :key="playlist.id">
        <RouterLink
          :to="`/playlist/${playlist.id}`"
          class="sidebar-item"
          :class="isActive(`/playlist/${playlist.id}`) ? 'active' : ''"
        >
          <img src="/images/icons/playlist-inactive.png" width="40" />
          <div class="flex-col flex">
            <span class="text-[15px]">{{ playlist.title }}</span>
            <span class="text-[12px]">{{ playlist.description }}</span>
          </div>
        </RouterLink>
        <TheDropDown
        :options="[{ option: 'delete', name: 'Delete' }]"
        @select="deletePlaylistMutation.mutate(String(playlist.id))"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  color: #ffffff;
  font-size: 0.9375rem;
  transition:
    background-color 0.15s,
    color 0.15s;
  text-decoration: none;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: rgba(205, 197, 194, 0.2);
  color: #ffffff;
}

.sidebar-item.active {
  background-color: rgba(205, 197, 194, 0.2);
}

.create {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.2rem 0.9rem;
  transition:
    background-color 0.3s,
    color 0.15s;
  cursor: pointer;
  background-color: rgba(205, 197, 194, 0.2);
}

.create:hover {
  background-color: #595959;
}
</style>
