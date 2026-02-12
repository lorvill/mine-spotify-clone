<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import CreatePlaylistModal from '@/components/ui/CreatePlaylistModal.vue'
import { useTemplateRef } from 'vue'
import TheDropDown from '@/components/ui/dropdowns/TheDropDown.vue'
import { usePlaylistDropdown } from '@/composables/usePlaylistDropdown.ts'
import { useAlbumsQuery } from '@/queries/useAlbumsQuery.ts'
import { useAllPlaylistsQuery } from '@/queries/useAllPlaylistsQuery.ts'

const route = useRoute()
const modalWindow = useTemplateRef('modalWindow')

const { status, data } = useAllPlaylistsQuery()
const { handlePlaylistAction, playlistOptions } = usePlaylistDropdown()
const { data: albums } = useAlbumsQuery()
</script>

<template>
  <div class="h-[100%] p-5 w-[300px] fixed bg-black">
    <div class="flex items-center justify-between">
      <router-link :to="{ name: 'browse' }">
        <img width="110" src="/images/icons/spotify-logo.png" />
      </router-link>

      <router-link
        :to="{ name: 'browse' }"
        class="flex items-center justify-center w-10 h-10"
        title="Browse"
      >
        <img src="/images/icons/layer.png" class="w-6 h-6 object-contain link-img" alt="Home" />
      </router-link>
    </div>

    <div class="mt-10 pl-2 flex items-center justify-between">
      <router-link :to="{ name: 'library' }" class="flex items-center gap-1.5" title="Library">
        <img width="20" class="link-img" src="/images/icons/music-album.png" />
        <span class="font-bold text-[15px]">Your Library</span>
      </router-link>

      <button class="create rounded-full font-bold text-white" @click="modalWindow?.openModal()">
        <img width="14" src="/images/icons/plus.png" class="invert-100" />
        <span>Create</span>
        <CreatePlaylistModal ref="modalWindow" />
      </button>
    </div>

    <ul class="mt-7">
      <router-link :to="{ name: 'liked-songs' }" class="sidebar-item mb-2">
        <img width="40" src="/images/icons/liked-inactive.png" />
        <div class="flex-col flex">
          <span class="text-[15px]">Liked Songs</span>
          <span class="text-[12px]">Playlist</span>
        </div>
      </router-link>
    </ul>

    <div v-if="status === 'error'" class="text-white-600"></div>
    <ul v-else-if="status === 'success'">
      <li
        v-for="playlist in data"
        :key="playlist.id"
        class="flex justify-between items-center sidebar-item cursor-pointer"
      >
        <router-link
          :to="{ name: 'playlist', params: { id: playlist.id } }"
          class="flex items-center gap-3"
        >
          <img src="/images/icons/playlist-inactive.png" width="40" />
          <div class="flex-col flex">
            <span class="text-[15px]">{{ playlist.title }}</span>
            <span class="text-[12px]">{{ playlist.description }}</span>
          </div>
        </router-link>
        <the-drop-down
          :options="playlistOptions"
          @select="(option) => handlePlaylistAction(option, playlist)"
        />
      </li>

      <li v-for="album in albums" :key="album.id" class="flex sidebar-item cursor-pointer mb-2">
        <img src="/images/icons/playlist-inactive.png" width="40" />
        <div class="flex-col flex">
          <span class="text-[15px]">{{ album.title }}</span>
          <span class="text-[12px]">{{ album.subtitle }}</span>
        </div>
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

.link-img {
  filter: invert(1) brightness(0.75);
  transition: filter 0.2s ease;
}

.active .link-img {
  filter: invert(1) brightness(1.5);
}
</style>