<script setup lang="ts">
import { useAlbumsQuery } from '@/composables/useAlbumsQuery.ts'
import LibraryCardList from '@/components/LibraryCardList.vue'
import { ref } from 'vue'

const { data: albums, isLoading: isAlbumsLoading, error: albumsError } = useAlbumsQuery()
const categories = ref(['All', 'Albums', 'Podcasts'])
</script>

<template>
  <div class="w-[calc(100%-240px)] fixed right-0 h-screen flex flex-col">
    <section
      id="TopNav"
      class="h-[60px] z-20 bg-[#101010] bg-opacity-80 flex items-center justify-end"
    >
<!--      <button-->
<!--        type="button"-->
<!--        class="rounded-2xl bg-gray-200 py-1 w-20 hover:bg-white mr-10 cursor-pointer font-medium"-->
<!--      >-->
<!--        Log in-->
<!--      </button>-->
    </section>

    <section>
      <div class="flex items-center justify-between mb-4">
        <button class="text-white text-sm font-medium">
          dfidkd
        </button>
      </div>

      <div v-if="isAlbumsLoading" class="text-gray-400">Loading...</div>
      <div v-else-if="albumsError" class="text-white">Failed to load albums</div>
      <LibraryCardList
        title="Albums"
        :items="albums ?? []"
      />
    </section>
  </div>
</template>

<style scoped></style>
