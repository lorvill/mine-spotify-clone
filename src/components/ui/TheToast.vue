<script setup lang="ts">
import { ref } from 'vue'

const visibility = ref(false)
const message = ref('')

function showToast(msg: string) {
  message.value = msg
  visibility.value = true

  setTimeout(() => {
    visibility.value = false
  }, 5000)
}

defineExpose({ showToast })
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="visibility"
        class="bg-green-500 text-black rounded-xl shadow-lg px-4 py-2 text-sm fixed bottom-5 left-5 z-50 animate-fadeIn"
      >
        {{ message }}
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
