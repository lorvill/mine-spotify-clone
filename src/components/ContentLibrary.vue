<script setup lang="ts">
import { useAlbumsQuery } from '@/composables/useAlbumsQuery.ts'
import { usePodcastsQuery } from '@/composables/usePodcastsQuery.ts'
import { useRouteQuery } from '@/composables/useRouteQuery.ts'
import LibraryCardList from '@/components/LibraryCardList.vue'
import Button from 'primevue/button'
import { computed } from 'vue'

const { data: albums, isLoading: isAlbumsLoading, error: albumsError } = useAlbumsQuery()
const { data: podcasts, isLoading: isPodcastsLoading, error: podcastsError } = usePodcastsQuery()
const selectedCategory = useRouteQuery('category', undefined)

const categories = [
  { id: undefined, name: 'All' },
  { id: 1, name: 'Albums' },
  { id: 2, name: 'Podcasts' },
]

const cards = computed(() => {
  if (selectedCategory.value === undefined) {
    return [...(albums?.value ?? []), ...(podcasts?.value ?? [])]
  }
  if (selectedCategory.value === 1) {
    return albums?.value ?? []
  }
  if (selectedCategory.value === 2) {
    return podcasts?.value ?? []
  }
  // return [...(albums?.value ?? []), ...(podcasts?.value ?? [])]
})

</script>

<template>
  <div class="w-[calc(100%-240px)] fixed right-0 h-screen flex flex-col">

    <section class="flex-1 overflow-y-auto px-4 pt-6 pb-6">
      <div class="flex gap-3 ml-15">
        <Button
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          @click="selectedCategory = category.id"
          severity="secondary"
          rounded
        />
      </div>

      <div v-if="isAlbumsLoading || isPodcastsLoading" class="text-gray-400">Loading...</div>
      <div v-else-if="albumsError || podcastsError" class="text-white">Failed to load data</div>
      <LibraryCardList
        v-else
        title="Albums"
        :items="cards"
      />
    </section>
  </div>
</template>