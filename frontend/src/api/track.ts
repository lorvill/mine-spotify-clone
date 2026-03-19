import type { Track } from '@/types/track.ts'

export const apiLikedTracks = {
  async addToLikedTracks(track: Track): Promise<Track> {
    const res = await fetch(`/api/liked-tracks/${track.id}`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to add a track to liked tracks')
    return res.json()
  },

  async getAllTracks() {
    const res = await fetch('/api/liked-tracks')
    if (!res.ok) throw new Error('Failed to get all tracks')
    return res.json()
  },
}