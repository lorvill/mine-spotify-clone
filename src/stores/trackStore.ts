import { defineStore } from 'pinia'
import type { Track } from '@/types/track.ts'

export const useTrackStore = defineStore('track', () => {
  const audio = new Audio()

    function playTrack(track: Track) {
    audio.src = track.path
    audio.play()
    console.log('Playing track:', track)
    setTimeout(() => {
      console.log(audio.duration)
    }, 200)
  }

  function pauseTrack(track: Track) {
    audio.pause()
    console.log('Paused track:', track)
  }

  return { playTrack, pauseTrack }
})