import type { Playlist } from '@/types/playlist.ts'

export const apiPlaylists = {
  async createPlaylist(playlist: Playlist): Promise<Playlist> {
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlist),
    })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  },

  async deletePlaylist(id: string): Promise<Playlist> {
    const response = await fetch(`/api/playlists/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  },
}
