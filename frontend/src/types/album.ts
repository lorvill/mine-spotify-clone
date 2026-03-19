import type { Track } from '@/types/track.ts'

export interface Album {
  id: number
  title: string
  cover: string
  releaseYear: string
  tracks: Track[]
}
