import type { Track } from '@/types/track.ts'

export interface Album {
  id: number
  name: string
  albumCover: string
  releaseYear: string
  tracks: Track[]
}
