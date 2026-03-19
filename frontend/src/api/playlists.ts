import type { Playlist } from '@/types/playlist.ts'

export const apiPlaylists = {
  async createPlaylist(playlist: Playlist): Promise<Playlist> {
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(playlist),
    })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  },

  async deletePlaylist(id: string): Promise<Playlist> {
    const response = await fetch(`/api/playlists/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  },

  async editPlaylist(editedData: Playlist ) {
    const { id, ...rest } = editedData
    const response = await fetch(`/api/playlists/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(rest)
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  }
}
