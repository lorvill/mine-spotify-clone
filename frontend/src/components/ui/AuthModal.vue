<script setup lang="ts">
import { ref, computed, reactive, useTemplateRef, onMounted } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication.ts'

const { login, register } = useAuthentication()
const open = ref<boolean>(false)
const mode = ref<'sign in' | 'sign up'>('sign in')
const form = reactive({
  identity: '',
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
  date_of_birth: '',
  rememberMe: false,
})

const usernameRef = useTemplateRef('username')
const passwordRef = useTemplateRef('password')

const gotoUsername = () => usernameRef.value?.focus()
const gotoPassword = () => passwordRef.value?.focus()

const isRegister = computed(() => mode.value === 'sign up')
const closeModal = () => (open.value = false)
const openModal = () => (open.value = true)

const outOfModal = (event: MouseEvent | TouchEvent) => {
  if (event.target === event.currentTarget) closeModal()
}

const switchMode = () => {
  mode.value = isRegister.value ? 'sign in' : 'sign up'
}

function resetForm(): void {
  form.email = ''
  form.username = ''
  form.password = ''
  form.rememberMe = false
}

async function authentication() {
  if (isRegister.value) {
    if (!form.email || !form.username || !form.password) return
  } else {
    if (!form.identity || !form.password) return
  }

  try {
    if (isRegister.value) {
      await register({
        email: form.email,
        username: form.username,
        password: form.password,
      })
    } else {
      await login({
        identity: form.identity,
        password: form.password,
        rememberMe: form.rememberMe,
      })
    }

    closeModal()
    resetForm()
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  usernameRef.value?.focus()
})

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
            <div v-if="mode === 'sign in'" class="flex flex-col gap-6">
              <input
                ref="username"
                v-model="form.identity"
                type="text"
                placeholder="Email or Username"
                required
                class="input"
                @keydown.down.prevent="gotoPassword"
                @keydown.enter="gotoPassword"
              />

              <input
                ref="password"
                v-model="form.password"
                type="password"
                placeholder="Password"
                required
                class="input"
                minlength="6"
                @keydown.up.prevent="gotoUsername"
              />

              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                  <input v-model="form.rememberMe" type="checkbox" class="checkbox" />
                  <span>Remember me</span>
                </label>

                <span class="text-sm text-gray-400 hover:text-white cursor-pointer">
                  Forgot a password?
                </span>
              </div>
            </div>

            <div v-else class="flex flex-col gap-4">
              <input
                v-model="form.email"
                type="email"
                placeholder="E-mail"
                required
                class="input"
              />

              <input
                v-model="form.username"
                placeholder="Username"
                type="text"
                required
                class="input"
              />

              <input
                v-model="form.password"
                type="password"
                placeholder="Password"
                required
                class="input"
                minlength="6"
              />

              <input
                v-model="form.password_confirmation"
                placeholder="Confirm password"
                type="password"
                required
                class="input"
              />
            </div>

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

            <button
              @click="switchMode"
              class="ml-1 text-white underline cursor-pointer hover:text-green-500"
            >
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