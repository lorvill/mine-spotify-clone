<script setup lang="ts">
import { useSelectAlbumQuery } from '@/composables/useSelectAlbumQuery.ts'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useTrackStore } from '@/stores/trackStore.ts'
import { secondsToMinutes } from '@/utils/secondsToMinutes.ts'
import DropDownMenu from './DropDownMenu.vue'
import ThePlayer from '@/components/ThePlayer.vue'

const store = useTrackStore()
</script>

<template>
  <div class="w-[calc(100%-240px)] fixed right-0 h-screen bg-neutral-900">
    <div class="p-8 flex-col overflow-auto max-h-[calc(100vh-60px)]">
      <div
        v-if="store.activeTrack"
        class="fixed bottom-0 w-[calc(100%-240px)]"
      >
        <ThePlayer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
