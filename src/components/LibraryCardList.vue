<script setup lang="ts">
import TheCard from '@/components/TheCard.vue'
import { ref } from 'vue'

interface Card {
  id: string | number
  title: string
  subtitle: string
  image: string
}

const props = defineProps<{
  title: string
  items: Card[]
}>()



</script>

<template>
  <div class="px-8 py-6">
    <div class="grid grid-cols-5 place-items-center gap-8 max-h-[500px]">
      <TheCard
        v-for="item in props.items ?? []"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :image="item.image"
      />
    </div>
  </div>
</template>

<style scoped></style>
