<script setup lang="ts">
import TheCard from '@/components/cards/TheCard.vue'

interface Card {
  id: string | number
  title: string
  cover: string
}
const props = defineProps<{
  title: string
  items: Card[] | undefined
}>()

</script>

<template>
  <div class="px-8 py-6">
    <div
      class="grid gap-5 place-items-center
             grid-cols-1
             sm:grid-cols-2
             md:grid-cols-3
             lg:grid-cols-5"
    >
      <router-link
        v-for="item in props.items ?? []"
        :key="item.id"
        :to="{ name: 'album', params: { id: item.id } }"
        class="w-full"
      >
        <TheCard
          :title="item.title"
          :cover="item.cover"
        />
      </router-link>
    </div>
  </div>
</template>
