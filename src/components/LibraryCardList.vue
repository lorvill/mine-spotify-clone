<script setup lang="ts">
import TheCard from '@/components/TheCard.vue'

interface Card {
  id: string | number
  title: string
  subtitle: string
  image: string
}
const props = defineProps<{
  title: string
  items: Card[] | undefined
}>()

</script>

<template>
  <div class="px-8 py-6">
      <div class="grid grid-cols-5 place-items-center gap-5 max-h-[500px]">
        <router-link
          v-for="item in props.items ?? []"
          :key="item.id"
          :to="{ name: 'album', params: { id: item.id } }"
        >
          <TheCard
            :title="item.title"
            :subtitle="item.subtitle"
            :image="item.image"
          />
        </router-link>
      </div>
  </div>
</template>

<style scoped></style>
