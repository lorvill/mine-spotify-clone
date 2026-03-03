<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import FileImageInput from '@/components/ui/FileImageInput.vue'
import type { Playlist } from '@/types/playlist.ts'
import { usePlaylistQuery } from '@/queries/usePlaylistQuery.ts'
import { useRoute } from 'vue-router'
import { whenever } from '@vueuse/core'

const props = defineProps<{ isRevealed: boolean; selectedPlaylist: Playlist | null }>()

const route = useRoute()
const { data, isLoading, isError } = usePlaylistQuery(() => props.selectedPlaylist?.id)

const playlistDescription = ref<string | undefined>('')
const playlistTitle = ref<string | undefined>('')
const imageFile = ref<File | null>(null)

const emit = defineEmits(['confirm', 'cancel'])

watch(
  () => route.params.id,
  () => {
    console.log(route.params.id)
  },
)

whenever(
  data,
  () => {
    playlistTitle.value = data.value!.title
    playlistDescription.value = data.value!.description
  },
  { once: true },
)
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
          class="bg-neutral-900 text-white rounded-2xl shadow-2xl w-[600px] h-[380px] flex flex-col overflow-hidden animate-fadeIn relative"
        >
          <div class="flex flex-row h-[350px]">
            <div class="w-[45%] bg-gradient-to-b flex items-center justify-center">
              <file-image-input v-model="imageFile">
                <template #default="{ imageUrl }">
                  <img v-if="imageUrl" :src="imageUrl" alt="cover" />
                </template>
              </file-image-input>
            </div>

            <div class="w-[55%] p-6 flex flex-col justify-between">
              <h2 class="text-2xl font-bold">Edit details</h2>
              <form class="flex flex-col gap-3">
                <input
                  v-model="playlistTitle"
                  type="text"
                  required
                  class="rounded-xl bg-neutral-700 border-1 border-transparent focus:border-green-500 transition-colors px-3 py-2 text-sm text-white placeholder-neutral-400 outline-none w-full"
                />
                <textarea
                  v-model="playlistDescription"
                  class="resize-none rounded-xl bg-neutral-700 border-1 border-transparent focus:border-green-500 transition-colors px-3 py-2 text-sm text-white placeholder-neutral-400 outline-none h-26 w-full"
                ></textarea>
              </form>
              <div class="flex justify-end">
                <button
                  @click="emit('confirm', {
                    ...selectedPlaylist,
                    title: playlistTitle,
                    description: playlistDescription,
                  })"
                  class="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-green-400 transition-colors cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div class="px-8 pb-6">
            <p class="text-[11px] text-white-500 font-bold">
              By proceeding, you agree to give Spotify access to the image you choose to upload.
              Please make sure you have the right to upload the image.
            </p>
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
