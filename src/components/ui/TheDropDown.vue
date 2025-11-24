<script setup lang="ts">
import { ref } from 'vue'
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

function toggleDropdown() {
  isOpened.value = !isOpened.value
}

function handleSelect(currentOption: Option) {
  if (currentOption.children) {
    selectedOption.value = currentOption.option === selectedOption.value ? null : currentOption.option
    isOpened.value = true
  }
  else {
    emit('select', currentOption)
    isOpened.value = false
  }
}

function outsideClick(event: MouseEvent | TouchEvent) {
  if (event.target === event.currentTarget) {
    closeDropdown()
    console.log('clicked outside')
  }
}
</script>

<template>
  <div class="inline-block text-left mr-2 drop-down" @click.self="outsideClick">
    <button
      @click.stop="toggleDropdown"
      class=" p-1">
      <img
        src="/images/icons/dots.png"
        alt="menu"
        class="w-6 h-6 invert cursor-pointer rotate-90"
      />
    </button>

    <div
      v-if="isOpened === true"
      class="absolute right-0 mt-0 w-50 origin-top-right rounded-xl bg-neutral-700 shadow-lg z-1"
    >
      <ul class="py-1">
        <li
          v-for="item in props.options"
          :key="item.option"
          @click="handleSelect(item)"
          class="px-4 py-2 text-sm text-white hover:bg-neutral-600 rounded-xl cursor-pointer transition"
        >
          {{ item.name }}

          <ul
            v-if="selectedOption === item.option"
            class="absolute mr-1 right-full top-0 bg-neutral-700 rounded-xl min-w-[150px] max-w-[180px] shadow-lg"
          >
            <li
              v-for="child in item.children"
              :key="child.option"
              @click.stop="emit('select', child)"
              class="px-4 py-2 hover:bg-neutral-600 rounded-xl cursor-pointer transition whitespace-nowrap overflow-hidden text-ellipsis truncate"
            >
              {{ child.name }}
            </li>
          </ul>
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