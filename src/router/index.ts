import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LibraryView from '@/views/LibraryView.vue'
import AlbumView from '@/views/AlbumView.vue'
import LikedTracks from '@/components/content/LikedTracks.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import LikedTracksView from '@/views/LikedTracksView.vue'

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
      path: '/playlist/:id',
      name: 'create-playlist',
      component: PlaylistView,
    },
    {
      path: '/liked-songs',
      name: 'liked-songs',
      component: LikedTracksView,
    },
  ],
})

export default router
