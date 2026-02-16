import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/main.css'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2,
      }
    }
  }
})
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
  timeout: 1800
})

app.mount('#app')
