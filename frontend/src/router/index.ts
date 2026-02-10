import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LibraryView from '@/views/LibraryView.vue'
import AlbumView from '@/views/AlbumView.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import LikedTracksView from '@/views/LikedTracksView.vue'
import BrowseAllView from '@/views/BrowseAllView.vue'
import { queryClient } from '@/helpers/queryClient.ts'
import { apiAuth } from '@/api/auth.ts'
import { authKeys } from '@/utils/queryKeysFactory.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
      meta: { requiresAuth: true },
    },
    {
      path: '/library/:id',
      name: 'album',
      component: AlbumView,
      meta: { requiresAuth: true },
    },
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlaylistView,
      meta: { requiresAuth: true },
    },
    {
      path: '/liked-songs',
      name: 'liked-songs',
      component: LikedTracksView,
      meta: { requiresAuth: true },
    },
    {
      path: '/',
      name: 'browse',
      component: BrowseAllView,
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
})

router.beforeEach(async (to, from, next) => {
  const requiredAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiredAuth) {
    return next()
  }
  try {
    const user = await queryClient.ensureQueryData({
      queryKey: authKeys.currentUser,
      queryFn: apiAuth.getUser,
    })
    if (user) {
      next()
    } else {
      next({...from, query: {auth: 'login'}})
    }
  }
  catch (error) {
    next({...from, query: {auth: 'login'}})
  }
})

export default router
