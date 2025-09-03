<script setup lang="ts">
import ContentCardList from '@/components/ContentCardList.vue'
import { usePodcastsQuery } from '@/composables/usePodcastsQuery.ts'
import { useRadioQuery } from '@/composables/useRadioQuery.ts'
import { useSongsQuery } from '@/composables/useSongsQuery.ts'

const { data: podcasts, isLoading: isPodcastsLoading, error: podcastsError } = usePodcastsQuery()
const { data: radio, isLoading: isRadioLoading, error: radioError } = useRadioQuery()
const { data: songs, isLoading: isSongLoading, error: songError } = useSongsQuery()

</script>

<template>
  <div class="w-[calc(100%-240px)] fixed right-0 h-screen flex flex-col">

    <section
      id="TopNav"
      class="h-[60px] z-20 bg-[#101010] bg-opacity-80 flex items-center justify-end"
    >
      <button
        type="button"
        class="rounded-2xl bg-gray-200 py-1 w-20 hover:bg-white mr-10 cursor-pointer font-medium"
      >
        Log in
      </button>
    </section>

    <div class="flex-1 overflow-y-auto">
      <section id="Podcasts" class="mt-6 px-4">
        <div v-if="isPodcastsLoading" class="text-gray-400">Loading...</div>
        <div v-else-if="podcastsError" class="text-white">Failed to load podcasts</div>
        <ContentCardList
          v-else
          title="Podcasts you might like"
          :items="podcasts ?? []"
        />
      </section>

      <section id="Radio" class="mt-6 px-4">
        <div v-if="isRadioLoading" class="text-gray-400">Loading...</div>
        <div v-else-if="radioError" class="text-white">Failed to load radio</div>
        <ContentCardList
          v-else
          title="Popular radio stations"
          :items="radio ?? []"
        />
      </section>

      <section id="NewReleases" class="mt-6 px-4">
        <div v-if="isSongLoading" class="text-gray-400">Loading...</div>
        <div v-else-if="songError" class="text-white">Failed to load new releases</div>
        <ContentCardList
          v-else
          title="New releases for you"
          :items="songs ?? []"
        />
      </section>
    </div>
  </div>
</template>
