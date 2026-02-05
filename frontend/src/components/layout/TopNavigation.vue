<script setup lang="ts">
import AuthModal from '@/components/ui/AuthModal.vue'
import { computed, useTemplateRef, watch } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication.ts'
import { RouterLink, useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const modalWindow = useTemplateRef('modalWindow')
const { logout, isAuthenticated, currentUser } = useAuthentication()
const username = computed(() => currentUser.value.username)

function isActive(path: string) {
  return route.path === path
}

watch(() => route.query.auth, (newVal) => {
  if (newVal === 'login') {
    modalWindow.value?.openModal()
  }
}, { immediate: true })

function resetUrl() {
  if (route.query.auth === 'login') {
    router.push({query: { ...route.query, auth: undefined } })
  }
}
</script>

<template>
  <section class="h-[60px] z-20 bg-[#101010] bg-opacity-80 flex items-center px-6">
    <div class="w-[300px] hidden md:block"></div>

    <div class="flex items-center gap-0">
      <RouterLink
        to="/"
        class="flex items-center justify-center w-10 h-10 mr-5"
        :class="isActive('/') ? 'brightness-200' : 'brightness-75'"
        title="Browse"
      >
        <img src="/images/icons/layer.png" class="w-6 h-6 object-contain invert-100" alt="Home" />
      </RouterLink>

      <RouterLink
        to="/home"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(205,197,194,0.2)] mr-1"
        :class="isActive('/home') ? 'brightness-150' : 'brightness-75'"
      >
        <img src="/images/icons/home.png" class="w-6 h-6 object-contain invert-100" alt="Home" />
      </RouterLink>
    </div>

    <form class="spotify-search relative flex items-center group">
      <input name="s" type="search" placeholder="What do you want to play?" class="search-input" />
      <img
        src="/images/icons/search.png"
        alt="search icon"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 invert-100 opacity-70 group-focus-within:opacity-100 cursor-pointer"
      />
    </form>

    <div class="ml-auto flex items-center gap-4">
      <span v-if="currentUser" class="text-white whitespace-nowrap"> Hello, {{ username }}! </span>

      <button
        v-if="!isAuthenticated"
        @click="modalWindow?.openModal()"
        type="button"
        class="rounded-full bg-neutral-300 py-2 px-6 hover:bg-green-500 transition duration-200 cursor-pointer font-bold text-black"
      >
        Log in
      </button>

      <div v-else class="flex items-center">
        <button
          type="button"
          @click="logout()"
          class="rounded-full bg-neutral-300 py-2 px-4 hover:bg-green-500 transition duration-200 cursor-pointer font-bold text-black"
        >
          Log out
        </button>
      </div>
    </div>

    <AuthModal ref="modalWindow" @close="resetUrl" />
  </section>
</template>

<style scoped>
.spotify-search input {
  width: 550px;
  height: 41px;
  padding: 0 48px 0 20px;
  border: 2px solid transparent;
  border-radius: 500px;
  background-color: #242424;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.spotify-search input:focus {
  border-color: white;
  background-color: #2a2a2a;
}

@media (max-width: 768px) {
  .spotify-search input {
    width: 100%;
    min-width: 150px;
  }
}
</style>
