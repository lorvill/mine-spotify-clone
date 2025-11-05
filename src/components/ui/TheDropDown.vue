<script setup lang="ts">
import { ref } from 'vue'
import type { Option } from '@/types/option.ts'

const isOpened = ref(false)
const props = defineProps<{
  options: Option[]
}>()
const selectedOption = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'select', option: Option): void
}>()

function toggleDropdown() {
  isOpened.value = !isOpened.value
}

function handleSelect(option: Option) {
  if (option.children && option.children.length > 0) {
    selectedOption.value = option.option === selectedOption.value ? null : option.option
    console.log('selected option:', selectedOption.value)
  }
  else {
    emit('select', option)
    isOpened.value = false
  }
}
</script>

<template>
  <div class="relative inline-block text-left mr-2">
    <button @click.stop="toggleDropdown" class="p-1">
      <img
        src="/images/icons/dots.png"
        alt="menu"
        class="w-6 h-6 invert cursor-pointer rotate-90"
      />
    </button>

    <div
      v-if="isOpened === true"
      class="absolute right-0 mt-0 w-50 origin-top-right rounded-xl bg-neutral-700 shadow-lg"
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