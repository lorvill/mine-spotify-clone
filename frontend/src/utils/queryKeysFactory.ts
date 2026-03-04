import type { MaybeRefOrGetter } from 'vue'

export const authKeys = {
  currentUser: ['user'] as const,
}

export const playlistKeys = {
  all: ['playlists'] as const,
  currentPlaylist: (id: MaybeRefOrGetter<string>) => [...playlistKeys.all, id] as const,
}
