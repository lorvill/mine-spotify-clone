<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthentication } from '@/composables/useAuthentication.ts'
import { Field, useForm } from 'vee-validate'
import { registrationSchema, loginSchema } from '@/modules/validation-schema.ts'
import type { LoginCredentials } from '@/types/loginCredentials.ts'
import type { RegisterCredentials } from '@/types/registerCredentials.ts'

const { login, register } = useAuthentication()
const open = ref(false)
const mode = ref<'sign in' | 'sign up'>('sign in')
const isRegister = computed(() => mode.value === 'sign up')
type AuthFormValues = Partial<RegisterCredentials & LoginCredentials>
const emit = defineEmits<{
  (e: 'close'): void
}>()

const validationSchema = computed(() =>
  isRegister.value ? registrationSchema('sign up') : loginSchema(),
)

const { handleSubmit, errors, resetForm } = useForm<AuthFormValues>({
  validationSchema,
})

const closeModal = () => {
  open.value = false
  resetForm()
  emit('close')
}

const openModal = () => (open.value = true)

const switchMode = () => {
  mode.value = isRegister.value ? 'sign in' : 'sign up'
  resetForm()
}

const onSubmit = handleSubmit(async (values) => {
  try {
    if (isRegister.value) {
      const data = values as RegisterCredentials
      await register(data)
    } else {
      const data = values as LoginCredentials
      await login(data)
    }
    closeModal()
  } catch (e) {
    throw new Error('Authentication failed')
  }
})

defineExpose({ openModal })
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        @click.self="closeModal"
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

          <form @submit.prevent="onSubmit" class="flex flex-col gap-4" :key="mode">
            <div v-if="!isRegister" class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <Field name="identity" type="text" placeholder="Email or Username" class="input" />
                <span v-if="errors.identity" class="text-xs text-red-500 ml-1">
                  {{ errors.identity }}
                </span>
              </div>

              <div class="flex flex-col gap-1">
                <Field name="password" type="password" placeholder="Password" class="input" />
                <span v-if="errors.password" class="text-xs text-red-500 ml-1">
                  {{ errors.password }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 cursor-pointer text-sm">
                  <Field name="rememberMe" type="checkbox" class="checkbox" />
                  <span>Remember me</span>
                </label>

                <span class="text-sm text-gray-400 hover:text-white cursor-pointer">
                  Forgot a password?
                </span>
              </div>
            </div>

            <div v-else class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <Field name="email" type="email" placeholder="E-mail" class="input" />
                <span v-if="errors.email" class="text-xs text-red-500 ml-1">
                  {{ errors.email }}
                </span>
              </div>

              <div class="flex flex-col gap-1">
                <Field name="username" placeholder="Username" type="text" class="input" />
                <span v-if="errors.username" class="text-xs text-red-500 ml-1">
                  {{ errors.username }}
                </span>
              </div>

              <div class="flex flex-col gap-1">
                <Field name="password" type="password" placeholder="Password" class="input" />
                <span v-if="errors.password" class="text-xs text-red-500 ml-1">
                  {{ errors.password }}
                </span>
              </div>

              <div class="flex flex-col gap-1">
                <Field
                  name="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  class="input"
                />
                <span v-if="errors.confirmPassword" class="text-xs text-red-500 ml-1">
                  {{ errors.confirmPassword }}
                </span>
              </div>
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
