import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Track } from '@/types/track.ts'

export function useLikedTracks() {
  const queryClient = useQueryClient()

  const addLikedTracksMutation = useMutation({
    mutationFn: addLikedTracks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedTracks'] })
    },
  })

  const removeLikedTracksMutation = useMutation({
    mutationFn: removeLikedTracks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedTracks'] })
    },
  })

  const likedTracksQuery = useQuery({
    queryKey: ['likedTracks'],
    queryFn: () =>
      fetch(`https://64e9970736435f75.mokky.dev/liked-tracks`).then(res => res.json()),
  })

  return {
    addLikedTracksMutation,
    removeLikedTracksMutation,
    likedTracksQuery,
  }
}

async function addLikedTracks(track: Track) {
  const url = 'https://64e9970736435f75.mokky.dev/liked-tracks'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(track),
  })
  if (!res.ok) throw new Error('Failed to add a track')
  return res.json()
}

async function removeLikedTracks(track: Track) {
  const url = `https://64e9970736435f75.mokky.dev/liked-tracks/${track.id}`
  const res = await fetch(url, {
    method: 'DELETE'
   })
  if (!res.ok) throw new Error('Failed to delete track')
  return res.json()
}
