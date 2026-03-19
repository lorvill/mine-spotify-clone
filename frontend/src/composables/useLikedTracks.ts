import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { apiLikedTracks } from '@/api/track.ts'

export function useLikedTracks() {
  const { addToLikedTracks, getAllTracks } = apiLikedTracks
  const queryClient = useQueryClient()

  const addLikedTracksMutation = useMutation({
    mutationFn: addToLikedTracks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likedTracks'] })
    },
  })

  // const removeLikedTracksMutation = useMutation({
  //   mutationFn: removeLikedTracks,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['likedTracks'] })
  //   },
  // })

  return {
    add: addLikedTracksMutation.mutate,
    // removeLikedTracksMutation,
  }
}
