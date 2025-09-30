import { defineStore } from 'pinia'
import type { Track } from '@/types/track.ts'
import type { Album } from '@/types/album.ts'
import { computed, ref } from 'vue'

export const useTrackStore = defineStore('track', () => {
  const audio = new Audio()
  const activeTrackIndex = ref<number | null>(null)
  const activePlaylist = ref<Track[] | null>(null)
  const activeAlbum = ref<Album | null>(null)
  const isPlaying = ref(false)
  const activeTrack = computed(() => {
    if (activeTrackIndex.value === null) {
      return null
    }
    return activePlaylist.value?.[activeTrackIndex.value]
  })

  function playTrack(playlist?: Track[] | null, index?: number, album?: Album | null) {
    if (playlist) {
      activePlaylist.value = playlist
      activeTrackIndex.value = index ?? 0
      if (album) activeAlbum.value = album
    }
    if (activeTrack.value) {
      audio.src = activeTrack.value.path
      audio.play()
        .then(() => isPlaying.value = true)
        .catch(error => console.error('Error playing audio:', error))
    }
  }

  function pauseTrack() {
    isPlaying.value = false
    audio.pause()
    console.log("paused audio")
  }

  function nextTrack() {
    if (!activePlaylist.value?.length || activeTrackIndex.value === null) return
    const nextIndex = activeTrackIndex.value + 1

    if (nextIndex < activePlaylist.value.length) {
      activeTrackIndex.value = nextIndex
      playTrack()
    }
  }

  function previousTrack() {
    if (!activePlaylist.value?.length || activeTrackIndex.value === null) return
    const nextIndex = activeTrackIndex.value - 1

    if (nextIndex >= 0) {
      activeTrackIndex.value = nextIndex
      playTrack()
    }
  }

  function toggleTrack(track?: Track, index?: number, album?: Album) {
    console.log("toggleTrack", track, index, album)
    if (activeTrack.value?.id === track?.id) { // то есть если совпадает текущий трек с треком который пришел в аргументах
      if (isPlaying.value)
        pauseTrack()
      else
        playTrack()
    }
    else { // если нет
      const playlist = album ? album.tracks : undefined
      playTrack(playlist, index, album)
    }
  }

  function repeatTrack() {

  }

  return { playTrack, pauseTrack, isPlaying, activeTrack, nextTrack, previousTrack, toggleTrack, repeatTrack, activeAlbum, activePlaylist, activeTrackIndex }
})