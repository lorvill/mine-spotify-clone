<script setup lang="ts" generic="T">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import type { Option } from '@/types/option.ts'

defineProps<{
  options: Option<T>[]
}>()

const emit = defineEmits<{
  (e: 'select', option: T): void
}>()

const isOpened = ref(false)
const closeDropdown = () => (isOpened.value = false)
const dropdownRef = useTemplateRef<HTMLElement>('dropdown')
const toggleDropdown = () => (isOpened.value = !isOpened.value)

const handleSelect = (option: Option<T>) => {
  emit('select', option.option)
  if (!option.children) closeDropdown()
}

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
        <img src="/images/icons/dots.png" class="w-6 h-6 invert rotate-90" alt="dots icon" />
      </slot>
    </button>

    <div v-if="isOpened" class="absolute right-0 z-10 mt-2 w-48 bg-neutral-700 shadow-lg">
      <ul class="py-1">
        <li
          v-for="item in options ?? []"
          :key="String(item.option)"
          @click="handleSelect(item)"
          class="px-4 py-2 text-sm text-white hover:bg-neutral-600 cursor-pointer"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
