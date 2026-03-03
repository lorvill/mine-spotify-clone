<script setup lang="ts">
import ContentLibrary from '@/components/content/ContentLibrary.vue'
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
  <div>
    <ContentLibrary />
  </div>
</template>