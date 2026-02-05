<script setup lang="ts">
import ThePlaylist from '@/components/content/ThePlaylist.vue'
import type { RouteLocation } from 'vue-router'
import { useAuthentication } from '@/composables/useAuthentication.ts'

function auth(to: RouteLocation, from: RouteLocation) {
  const { isAuthenticated } = useAuthentication()
  if (!isAuthenticated) {
    return '/login'
  }
}
</script>

<template>
  <ThePlaylist />
</template>

<style scoped></style>
