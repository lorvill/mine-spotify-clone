<script setup lang="ts">
import TheSidebar from '@/components/layout/TheSidebar.vue'
import TopNavigation from '@/components/layout/TopNavigation.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <TheSidebar />
  <TopNavigation />

  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.params.id" />
    </transition>
  </router-view>

  <VueQueryDevtools />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
