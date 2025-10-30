import {useQuery, keepPreviousData} from "@tanstack/vue-query";
import type { Album } from '@/types/album.ts'

export function useSelectAlbumQuery(id: number | string) {
  return useQuery({
    queryKey: ['album', id],
    queryFn: () => selectedAlbum(id),
    placeholderData: keepPreviousData,
  })
}

async function selectedAlbum(id: number | string): Promise<Album> {
  const url = `https://64e9970736435f75.mokky.dev/album/${id}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load data')
  return res.json()
}