<script setup lang="ts">
import TheSlider from '@/components/TheSlider.vue'
import TheCard from '@/components/TheCard.vue'

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
  <h2 class="text-2xl font-bold ml-8 text-white">{{ props.title }}</h2>
  <TheSlider>
    <template v-slot:cards>
      <div class="px-8 py-6">
        <div class="flex gap-4 overflow-x-auto max-h-[500px]">
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

    <template v-slot:controls="{ scroll }">
      <div class="flex justify-between ml-5 mr-5 mt-1" v-show="scroll">
        <button
          class="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center hover:bg-neutral-400 cursor-pointer"
          @click="scroll('left')"
        >
          <img src="/images/icons/chevron.svg" class="transform rotate-180 w-4 h-4" alt="#!"
          />
        </button>
        <button
          class="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center hover:bg-neutral-400 cursor-pointer"
          @click="scroll('right')"
        >
          <img src="/images/icons/chevron.svg" class="w-4 h-4" alt="#!" />
        </button>
      </div>
    </template>
  </TheSlider>
</template>
