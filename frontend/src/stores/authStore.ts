import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const isLoggedIn = ref(false)
  const user = ref(null)

  function setAuthenticated(userData: any) {
    isLoggedIn.value = true
    user.value = userData
  }

  function clearAuthenticated() {
    isLoggedIn.value = false
    user.value = null
  }

  return {
    setAuthenticated,
    clearAuthenticated,
    isLoggedIn,
    user
  }
})