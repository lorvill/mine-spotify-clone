<script setup lang="ts">
import { ref } from 'vue'

type Option = { option: string; name: string }

const isOpened = ref(false)
const props = defineProps<{
  options: Option[]
}>()

const emits = defineEmits<{
  (e: 'select', options: Option[]): void
}>()

function toggleDropdown() {
  isOpened.value = !isOpened.value
}

function handleSelect(option: Option) {
  emits('select', option)
  isOpened.value = false
}
</script>

<template>
  <div class="relative inline-block text-left mr-2">

    <button @click.stop="toggleDropdown" class="p-1">
      <img src="/images/icons/dots.png" alt="menu" class="w-6 h-6 invert cursor-pointer rotate-90" />
    </button>

    <div v-if="isOpened" class="absolute right-0 mt-0 w-50 origin-top-right rounded-xl bg-neutral-700 shadow-lg">
      <ul class="py-1">
        <li
          v-for="option in props.options"
          :key="option.option"
          @click="handleSelect(option)"
          class="px-4 py-2 text-sm text-white hover:bg-neutral-600 rounded-xl cursor-pointer transition"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
