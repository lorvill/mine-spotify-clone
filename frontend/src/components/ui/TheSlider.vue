<script setup lang="ts">
import { useTemplateRef } from 'vue'

const scrolling = useTemplateRef<HTMLElement | null>('scrolling')
let startX = 0
let scrollStart = 0
let mouseIsDown = false

function handleScroll(direction: 'left' | 'right') {
  const scrollAmount = 200
  scrolling.value?.scrollBy({
    top: 0,
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  })
}

function mouseDown(e: MouseEvent) {
  if (!scrolling.value) return

  mouseIsDown = true
  startX = e.clientX
  scrollStart = scrolling.value.scrollLeft
  window.addEventListener('mousemove', mouseMove)
}

function mouseMove(e: MouseEvent) {
  if (!scrolling.value || !mouseIsDown) return

  const x = e.clientX - startX
  scrolling.value.scrollLeft = scrollStart - x
}

function mouseUp() {
  mouseIsDown = false
  window.removeEventListener('mousemove', mouseMove)
  window.removeEventListener('mouseup', mouseUp)
}

defineExpose({ handleScroll })

// подписываемся на mousedown, когда он происходит - сохраняем x-координату (начальная координата)
// во время mousedown подписываемся на mousemove
// во время mousemove мы делаем скролл
// когда отпускам мышь - mouseup
// в mouseup удаляем mousemove (removeEventListener)
</script>

<template>
  <div>
    <div
      ref="scrolling"
      class="flex gap-4 overflow-x-auto max-h-[500px]"
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
    >
      <slot name="cards"/>
    </div>

    <slot
      name="controls"
      :scroll="handleScroll"
    />
  </div>
</template>