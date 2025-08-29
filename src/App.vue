<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>



  <div
    class="
            fixed
            right-0
            top-0
            w-[calc(100%-240px)]
            overflow-auto
            h-full
            bg-gradient-to-b
            from-[#1C1C1C]
            to-black
        "
  >
    <div class="mt-[70px]"></div>
    <div class="mb-[100px]"></div>
  </div>

</template>

