<script setup lang="ts">
import TheSidebar from '@/components/layout/TheSidebar.vue'
import TopNavigation from '@/components/layout/TopNavigation.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#121212]">
    <TheSidebar class="flex-shrink-0" />

    <div class="flex-1 flex flex-col relative overflow-hidden">
      <TopNavigation />

      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.params.id" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>

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

.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: 3px solid transparent;
  background-clip: content-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
