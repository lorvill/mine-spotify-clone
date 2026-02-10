export const authKeys = {
  currentUser: ['user'] as const,
}

export const playlistKeys = {
  all: ['playlists'] as const,
  currentPlaylist: (id: string) => [...playlistKeys.all, id] as const,
}
