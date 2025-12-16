<script setup lang="ts">
import { ref, watch } from 'vue'

const { modelValue } = defineProps<{
  modelValue: File | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const imagePreview = ref<string | null>(null)

watch(() => modelValue, (newFile, oldFile) => {
  if (oldFile && imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  if (newFile) {
    imagePreview.value = URL.createObjectURL(newFile)
  } else {
    imagePreview.value = null
  }
})

function selectImage(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  emit('update:modelValue', file)
}
</script>

<template>
    <label
      class="cursor-pointer w-[200px] h-[200px] bg-neutral-800 rounded-xl flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-300 overflow-hidden"
    >
      <slot :imageUrl="imagePreview">
        <img
          v-if="imagePreview"
          :src="imagePreview"
          class="w-full h-full object-cover rounded-xl"
          alt="Selected Image"
        />
        <div v-else class="flex items-center justify-center w-full h-full">
          <img src="/images/icons/music.png" class="w-20 h-20 opacity-90" alt="No Image Selected" />
        </div>
      </slot>

      <input
        type="file"
        accept="image/*"
        style="display: none"
        @change="selectImage"
      />
    </label>

</template>