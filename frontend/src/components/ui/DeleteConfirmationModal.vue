<script setup lang="ts">
import type { Playlist } from '@/types/playlist.ts'

defineProps<{ isRevealed: boolean, selectedPlaylist: Playlist | null }>();
const emit = defineEmits(["confirm", "cancel"])
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="isRevealed"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        @click.self="emit('cancel')"
      >
        <div
          class="w-full max-w-lg rounded-2xl bg-neutral-900 text-white shadow-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <h2 class="text-2xl font-semibold mb-4">Confirm your action</h2>

            <p class="text-neutral-300 leading-relaxed">
              Are you sure you want to delete
              <span class="font-semibold text-white">
                {{ selectedPlaylist?.title }}
              </span>
              playlist?
            </p>
          </div>

          <div class="flex justify-end gap-3 mt-8">
            <button
              @click="emit('cancel')"
              class="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              @click="emit('confirm')"
              type="button"
              class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition font-medium cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
