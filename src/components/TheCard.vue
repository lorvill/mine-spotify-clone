<script setup lang="ts">
defineProps<{
  title: string,
  subtitle: string,
  image: string
}>()
</script>

<template>
  <div class="min-w-60 w-60 bg-[#131313] rounded-xl p-4 hover:bg-[#282828] cursor-pointer">
    <img :src="image" alt="" class="rounded-lg mb-4 select-none" />
    <h3 class="text-white text-md font-semibold truncate select-none">{{ title }}</h3>
    <p class="text-gray-400 text-xs truncate mt-2 select-none">{{ subtitle }}</p>
  </div>
</template>