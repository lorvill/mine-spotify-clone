import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LibraryView from '@/views/LibraryView.vue'
import AlbumView from '@/views/AlbumView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
    },
    {
      path: '/library/:id',
      name: 'album',
      component: AlbumView,
    },
    {
      path: '/search',
      name: 'search',
      component: HomeView,
    },
    {
      path: '/create-playlist',
      name: 'playlist',
      component: HomeView,
    },
    {
      path: '/liked',
      name: 'liked',
      component: HomeView,
    },
  ],
})

export default router
