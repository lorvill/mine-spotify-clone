<script setup lang="ts">
import { ref, computed } from 'vue'

const open = ref<boolean>(false)

const mode = ref<'sign in' | 'sign up'>('sign in')

const form = ref({
  email: '',
  password: '',
})

const isRegister = computed(() => mode.value === 'sign up')
const closeModal = () => (open.value = false)
const openModal = () => (open.value = true)
const outOfModal = (event: MouseEvent | TouchEvent) => {
  if (event.target === event.currentTarget) closeModal()
}

const switchMode = () => {
  mode.value = isRegister.value ? 'sign in' : 'sign up'
}

async function authentication() {
  if (
    !form.value.email ||
    !form.value.password ||
    form.value.password.length < 6 ||
    !form.value.email.includes('@')
  ) return

  try {
    const response = await fetch(
      isRegister.value ? '/api/auth/register' : '/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.value.email,
          password: form.value.password,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Auth failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)

    closeModal()
    form.value.email = ''
    form.value.password = ''

  } catch (err) {
    console.error(err)
  }
}

defineExpose({ openModal })
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        @click.self="outOfModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div
          class="bg-neutral-900 text-white rounded-2xl shadow-2xl w-[420px] p-8 flex flex-col gap-6 animate-fadeIn"
        >
          <div class="text-center">
            <h2 class="text-2xl font-semibold">
              {{ isRegister ? 'Create account' : 'Login' }}
            </h2>
          </div>

          <form @submit.prevent="authentication" class="flex flex-col gap-4">
            <input v-model="form.email" type="email" placeholder="Email" required class="input" />

            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              required
              class="input"
            />

            <button
              type="submit"
              class="mt-2 bg-white text-black rounded-xl py-2 font-medium hover:bg-green-500 transition cursor-pointer"
            >
              {{ isRegister ? 'Sign up' : 'Sign in' }}
            </button>
          </form>

          <div class="text-center text-sm text-neutral-400">
            <span>
              {{ isRegister ? 'Already have an account?' : 'No account?' }}
            </span>
            <button @click="switchMode" class="ml-1 text-white underline">
              {{ isRegister ? 'Sign in' : 'Sign up' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.input {
  background: #171717;
  border-radius: 12px;
  padding: 10px 14px;
  outline: none;
  border: 1px solid #262626;
}

.input:focus {
  border-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-fadeIn {
  animation: fadeIn;
}
</style>