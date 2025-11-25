<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePlaylist } from '@/composables/usePlaylist.ts'
import { useRouter } from 'vue-router'
import FileImageInput from '@/components/ui/FileImageInput.vue'
const open = ref(false)

const closeModal = () => {
  cleanup()
  open.value = false
}

const openModal = () => { open.value = true }
const { addPlaylistMutation } = usePlaylist()
const playlistId = ref()
const playlistDescription = ref('')
const playlistName = ref('')
const router = useRouter()
const imageFile = ref<File | null>(null)

const disabledBtn = computed(() => {
  return !playlistName.value
})

const outOfModal = (event: MouseEvent | TouchEvent) => {
  if (event.target === event.currentTarget) closeModal()
}

function cleanup() {
  playlistName.value = ''
  playlistDescription.value = ''
}

function createPlaylist() {
  const playlist = {
    id: playlistId.value,
    name: playlistName.value,
    description: playlistDescription.value,
  }
  addPlaylistMutation.mutate(playlist, {
    onSuccess: (data) => {
      router.push(`/playlist/${data.id}`)
      console.log('Playlist created successfully:', data)
      closeModal()
    },
    onError: (error) => {
      console.error('Error creating playlist:', error)
    },
  })
}

defineExpose({ openModal })
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer"
        @click.self="outOfModal"
      >
        <div class="bg-neutral-900 text-white rounded-2xl shadow-2xl w-[650px] h-[300px] flex overflow-hidden animate-fadeIn">
          <div class="w-[45%] bg-gradient-to-b flex items-center justify-center">

            <file-image-input v-model="imageFile">
              <template #default="{ imageUrl }">
                <img v-if="imageUrl" :src="imageUrl" alt="cover"/>
              </template>
            </file-image-input>

          </div>
          <div class="w-[55%] p-6 flex flex-col justify-between">
            <h2 class="text-2xl font-bold mb-3">Create a playlist</h2>

            <form class="flex flex-col gap-3">
              <input
                v-model="playlistName"
                type="text"
                placeholder="Add a name"
                required
                class="rounded-xl bg-neutral-700 border-1 border-transparent focus:border-green-500 transition-colors px-3 py-2 text-sm text-white placeholder-neutral-400 outline-none w-full"
              />

              <textarea
                v-model="playlistDescription"
                placeholder="Write an optional description"
                class="resize-none rounded-xl bg-neutral-700 border-1 border-transparent focus:border-green-500 transition-colors px-3 py-2 text-sm text-white placeholder-neutral-400 outline-none h-26 w-full"
              ></textarea>
            </form>

            <div class="flex justify-end">
              <button
                @click="createPlaylist"
                :disabled="disabledBtn"
                class="px-6 py-2 rounded-full bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
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
