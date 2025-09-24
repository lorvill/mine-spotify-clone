import { defineStore } from 'pinia'
import type { Track } from '@/types/track.ts'
import { ref } from 'vue'

export const useTrackStore = defineStore('track', () => {
  const audio = new Audio()
  const activeTrack = ref<Track | null>(null)

    function playTrack(track: Track) {
      if (activeTrack.value !== track) {
        activeTrack.value = track
        audio.src = track.path
      }

      audio.play()
        ?.then(() => console.log('Audio is playing'))
        .catch((error) => console.error('Error playing audio:', error))
     }

      // setTimeout(() => {
      //   console.log(audio.duration)
      // }, 200)

    function pauseTrack(track: Track) {
      audio.pause()

      if (audio.paused) {
        console.log('Audio is paused.')
      } else {
        console.error('Error paused audio')
      }
    }

    return { playTrack, pauseTrack }
})