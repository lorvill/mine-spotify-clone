import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query'

export function usePlaylist() {
  const queryClient = useQueryClient()

  const addPlaylistMutation = useMutation({
    mutationFn: addPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
  })

  const removePlaylistMutation = useMutation({
    mutationFn: removePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist'] })
    },
  })

  const playlistQuery = useQuery({
    queryKey: ['playlist'],
    queryFn: () => fetch(`https://64e9970736435f75.mokky.dev/playlist`).then(res => res.json()),
  })

  return {
    addPlaylistMutation,
    removePlaylistMutation,
    playlistQuery,
  }
}

async function addPlaylist(playlist: { id: number, name: string, description: string }) {
  const url = 'https://64e9970736435f75.mokky.dev/playlist'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  })
  if (!res.ok) throw new Error('Failed to create playlist')
  return res.json()
}

async function removePlaylist(playlist: { id: number, name: string, description: string }) {
  const url = 'https://64e9970736435f75.mokky.dev/playlist'
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  })
  if (!res.ok) throw new Error('Failed to delete playlist')
  return res.json()
}