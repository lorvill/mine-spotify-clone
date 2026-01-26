<script setup lang="ts">
import AuthModal from '@/components/ui/AuthModal.vue'
import { computed, useTemplateRef } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication.ts'

const modalWindow = useTemplateRef('modalWindow')
const { logout, isAuthenticated, currentUser } = useAuthentication()
const username = computed(() => currentUser.value.username)
</script>

<template>
  <section class="h-[60px] z-20 bg-[#101010] bg-opacity-80 flex items-center px-6">
    <div class="w-[240px] hidden md:block"></div>

    <form class="spotify-search flex-1 mx-4 md:mx-0">
      <input name="s" type="search" placeholder="What do you want to play?" />
    </form>

    <span v-if="currentUser" class="pr-5">Hello, {{ username }}!</span>

    <button
      v-if="!isAuthenticated"
      @click="modalWindow?.openModal()"
      type="button"
      class="
      ml-auto
      rounded-2xl
      bg-neutral-300
      py-1 w-20
      hover:bg-green-500
      transition duration-200
      cursor-pointer
      font-medium
      text-black
      hover:text-neutral-700"
    >
      Log in
    </button>

    <div v-else class="flex items-center justify-between">
      <button
        type="button"
        @click="logout()"
        class="
        ml-auto
        rounded-2xl
        bg-neutral-300
        py-1 w-20
        hover:bg-green-500
        transition duration-200
        cursor-pointer
        font-medium
        text-black
        hover:text-neutral-700"
      >
        Log out
      </button>
    </div>

    <AuthModal ref="modalWindow" />
  </section>
</template>

<style scoped>
.spotify-search input {
  width: 100%;
  min-width: 180px;
  max-width: 550px;
  padding: 8px 12px;
  border: 2px solid transparent;
  border-radius: 25px;
  background-color: #282828;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    width 0.3s ease;
}

.spotify-search input::placeholder {
  color: #b3b3b3;
}

.spotify-search input:focus {
  border-color: white;
  background-color: #3e3e3e;
}
</style>
