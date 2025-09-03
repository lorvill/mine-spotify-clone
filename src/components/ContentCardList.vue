<script setup lang="ts">
import ContentCard from '@/components/ContentCard.vue';

interface Item {
  id: string | number;
  title: string;
  subtitle: string;
  image: string;
}

const props = defineProps<{
  title: string;
  items: Item[];
}>();
</script>

<template>
  <div class="px-8 py-6">
    <h2 class="text-2xl font-bold mb-4 text-white">{{ props.title }}</h2>
    <div class="flex justify-between gap-4">
      <ContentCard
        v-for="item in props.items ?? []"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :image="item.image"
      />
    </div>

    <div class="flex justify-between m-5">
      <div>
        <button class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-400 cursor-pointer">
          <img src="/images/icons/right-thin-chevron-svgrepo-com.svg" class="transform rotate-180 w-4 h-4" alt="#!">
        </button>
      </div>
        <button class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-400 cursor-pointer">
          <img src="/images/icons/right-thin-chevron-svgrepo-com.svg" class="w-4 h-4" alt="#!">
        </button>
    </div>

    <hr class="border-b border-b-gray-800 mt-2">

  </div>
</template>

