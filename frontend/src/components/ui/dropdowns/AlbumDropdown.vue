<script setup lang="ts">
import TheDropdownItem from '@/components/ui/dropdowns/TheDropdownItem.vue'
import TheDropdown from '@/components/ui/dropdowns/TheDropdown.vue'
import { ref } from 'vue'
import type { Track } from '@/types/track.ts'

const props = defineProps<{ track: Track }>()

const isOpened = ref(false)

</script>

<template>
  <the-dropdown v-model="isOpened">
    <the-dropdown-item>Add to Liked Songs</the-dropdown-item>
  </the-dropdown>
</template>
