import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { Track } from '@/types/track.ts'
import { useLikedTracks } from '@/composables/useLikedTracks.ts'
import { apiLikedTracks } from '@/api/track.ts'

export function useLikedTracksQuery() {
  const { getAllTracks }= apiLikedTracks
  return useQuery({
    queryKey: ['tracks'],
    queryFn: getAllTracks,
    placeholderData: keepPreviousData,
  })
}