import {useQuery, keepPreviousData} from "@tanstack/vue-query";

interface Track {
  id: number
  name: string
  path: string
}

interface Album {
  id: number
  name: string
  albumCover: string
  releaseYear: string
  tracks: Track[]
}

async function selectedAlbum(id: string | number): Promise<Album> {
  const url = `https://64e9970736435f75.mokky.dev/album/${id}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load data')
  return res.json()
}


export function useSelectAlbumQuery(id: number | string) {
  return useQuery({
    queryKey: ['album', id],
    queryFn: () => selectedAlbum(id),
    placeholderData: keepPreviousData,
  })
}