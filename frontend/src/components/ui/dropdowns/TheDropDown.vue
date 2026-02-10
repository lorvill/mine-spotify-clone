<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Option } from '@/types/option.ts'
const props = defineProps<{
  options: Option[]
}>()

const emit = defineEmits<{
  (e: 'select', option: Option): void
}>()

const isOpened = ref(false)
const selectedOption = ref<string | null>(null)
const closeDropdown = () => isOpened.value = false
const dropdownRef = ref<HTMLElement | null>(null)
const toggleDropdown = () => isOpened.value = !isOpened.value

function handleSelect(item: Option) {
  emit('select', item)
  if (!item.children) closeDropdown()
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
    <div class="relative inline-block" ref="dropdownRef" >
      <button @click.stop="toggleDropdown" class="p-1 block cursor-pointer">
        <slot name="trigger">
          <img src="/images/icons/dots.png" class="w-6 h-6 invert rotate-90" />
        </slot>
      </button>

      <div
        v-if="isOpened"
        class="absolute right-0 z-10 mt-2 w-48 rounded-xl bg-neutral-700 shadow-lg"
      >
        <ul class="py-1">
          <li
            v-for="item in options"
            :key="item.option"
            @click="handleSelect(item)"
            class="px-4 py-2 text-sm text-white hover:bg-neutral-600 cursor-pointer"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
</template>

<style scoped>
.drop-down {
  opacity: 1;
}

.drop-down:hover {
  opacity: 1;
}

.drop-down:focus {
  opacity: 1;
}
</style>