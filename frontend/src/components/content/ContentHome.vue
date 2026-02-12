<script setup lang="ts">
import HomeCardList from '@/components/cards/HomeCardList.vue'
import { usePodcastsQuery } from '@/queries/usePodcastsQuery.ts'
import { useRadioQuery } from '@/queries/useRadioQuery.ts'
import { useSongsQuery } from '@/queries/useSongsQuery.ts'

const { data: podcasts, isLoading: isPodcastsLoading, error: podcastsError } = usePodcastsQuery()
const { data: radio, isLoading: isRadioLoading, error: radioError } = useRadioQuery()
const { data: songs, isLoading: isSongLoading, error: songError } = useSongsQuery()
</script>

<template>
  <div class="w-[calc(100%-300px)] fixed right-0 h-screen flex flex-col">

    <div class="flex-1 overflow-y-auto no-scrollbar">
      <section id="Podcasts" class="mt-6 px-4">
        <div v-if="isPodcastsLoading" class="text-gray-400">Loading...</div>
        <div v-else-if="podcastsError" class="text-white">Failed to load podcasts</div>
        <HomeCardList v-else title="Podcasts you might like" :items="podcasts ?? []" />
      </section>

      <section id="Radio" class="mt-6 px-4">
        <div v-if="isRadioLoading" class="text-gray-400">Loading...</div>
        <div v-else-if="radioError" class="text-white">Failed to load radio</div>
        <HomeCardList v-else title="Popular radio stations" :items="radio ?? []" />
      </section>

      <section id="NewReleases" class="mt-6 px-4">
        <div v-if="isSongLoading" class="text-gray-400">Loading...</div>
        <div v-else-if="songError" class="text-white">Failed to load new releases</div>
        <HomeCardList v-else title="New releases for you" :items="songs ?? []" />
      </section>
    </div>
  </div>
</template>
