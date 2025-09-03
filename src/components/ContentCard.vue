<script setup lang="ts">
defineProps<{
  title: string,
  subtitle: string,
  image: string
}>()
</script>

<template>
  <div class="w-65 bg-[#131313] rounded-xl p-4 hover:bg-[#282828] cursor-pointer">
    <img :src="image" alt="" class="rounded-lg mb-4" />
    <h3 class="text-white text-md font-semibold truncate">{{ title }}</h3>
    <p class="text-gray-400 text-xs truncate mt-2">{{ subtitle }}</p>
  </div>
</template>