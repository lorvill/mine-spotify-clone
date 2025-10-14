import { defineStore } from 'pinia'
import type { Track } from '@/types/track.ts'
import type { Album } from '@/types/album.ts'
import { computed, ref, watch } from 'vue'

export const useTrackStore = defineStore('track', () => {
  const audio = new Audio()
  const duration = ref(0)
  const currentTime = ref(0)
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
  const isShuffled = ref(false)
  const volume = ref(1)
  const muted = ref(false)
  const finalVolume = computed(() => (muted.value ? 0 : volume.value ** 2))
  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime
    duration.value = isFinite(audio.duration) ? audio.duration : 0
  })
  audio.addEventListener('ended', () => {
    nextTrack()
  })

  function toggleMute() {
    muted.value = !muted.value
  }

  function setVolume(value: number) {
    volume.value = Math.min(1, Math.max(0, value))

  }

  watch(finalVolume, (value) => {
    audio.volume = value
  })

  function playTrack(playlist?: Track[], index = 0, album?: Album) {
    // определяем трек, который нужно воспроизвести
    const track = playlist?.[index]
    if (!track) return

    // если трек новый обновляем плейлист и источник
    if (activeTrack.value?.id !== track.id) {
      activePlaylist.value = playlist ?? null
      activeAlbum.value = album ?? null
      activeTrackIndex.value = index
      audio.src = track.path
    }

    // воспроизводим трек (если уже был тот же трек, начнется с позиции паузы)
    audio.play()
      .then(() => {
        isPlaying.value = true
      })
      .catch(error => {
        console.error(error)
      })
  }

  function pauseTrack() {
    isPlaying.value = false
    audio.pause()
  }

  function shuffleAlbum<T>(track: T[]) { //дженерик - чтоб функция была универсальной и работала с любым типом массивов
    return [...track].sort(() => Math.random() - 0.5)
  }

  function getPlaylist(album: Album, current?: Track) {
    if (!album?.tracks?.length) return []

    const playlist = isShuffled.value ? shuffleAlbum(album.tracks) : album.tracks
    if (current) {
      console.log(current)
      return [current, ...playlist.filter(t => t.id !== current.id)]
    }
    return playlist
  }

  function toggleShuffle() {
    isShuffled.value = !isShuffled.value

    const album = activeAlbum.value
    if (!album?.tracks?.length) return

    activePlaylist.value = getPlaylist(album, activeTrack.value || undefined)
    console.log(activePlaylist.value)
    activeTrackIndex.value = 0
  }

  function playPlaylist(album: Album) {
    if (activeAlbum.value?.id === album.id && isPlaying.value) {
      pauseTrack()
      return
    }

    if (!album.tracks.length) return

    activePlaylist.value = getPlaylist(album)
    activeAlbum.value = album
    playTrack(activePlaylist.value, 0, album)
  }

  function nextTrack() {
    if (activePlaylist.value && activeTrackIndex.value !== null) {
      const nextIndex = activeTrackIndex.value + 1
      if (nextIndex < activePlaylist.value.length)
        playTrack(activePlaylist.value, nextIndex, activeAlbum.value ?? undefined)
    }
  }

  function previousTrack() {
    if (activePlaylist.value && activeTrackIndex.value !== null) {
      const prevIndex = activeTrackIndex.value - 1
      if (prevIndex >= 0)
        playTrack(activePlaylist.value, prevIndex, activeAlbum.value ?? undefined)
    }
  }

  function togglePlayPause(track?: Track, index?: number, album?: Album) {
    if (!track || activeTrack.value?.id === track.id) {
      return isPlaying.value ? pauseTrack() : audio.play()
        .then(() => isPlaying.value = true)
    }

    playTrack(album?.tracks, index, album)
  }

  function repeatTrack() {

  }

  function seekTo(value: number) {
    audio.currentTime = value
    currentTime.value = value
  }

  return {
    playPlaylist,
    nextTrack,
    previousTrack,
    togglePlayPause,
    repeatTrack,
    activeTrack,
    activeAlbum,
    activePlaylist,
    activeTrackIndex,
    isPlaying,
    duration,
    currentTime,
    seekTo,
    toggleShuffle,
    isShuffled,
    volume,
    muted,
    toggleMute,
    finalVolume,
    setVolume,
  }
})