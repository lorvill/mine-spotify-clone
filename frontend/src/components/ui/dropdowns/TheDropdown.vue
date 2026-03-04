<script setup lang="ts" generic="T">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

const isOpened = defineModel({ default: false })
const closeDropdown = () => {
  isOpened.value = false
}
const dropdownRef = useTemplateRef<HTMLElement>('dropdown')
const toggleDropdown = () => (isOpened.value = !isOpened.value)

const outsideClick = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => document.addEventListener('click', outsideClick))
onUnmounted(() => document.removeEventListener('click', outsideClick))
</script>

<template>
  <div class="relative inline-block" ref="dropdown">
    <button @click.stop="toggleDropdown" class="p-1 block cursor-pointer">
      <slot name="trigger">
        <img src="/images/icons/dots.png" class="w-6 h-6 invert rotate-90" alt="dots" />
      </slot>
    </button>

    <div
      v-if="isOpened"
      class="absolute right-0 z-[9999] w-40 bg-neutral-700 shadow-xl border border-neutral-600 rounded-md"
    >
      <ul class="py-1">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
