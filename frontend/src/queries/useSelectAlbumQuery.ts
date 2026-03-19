import {useQuery, keepPreviousData} from "@tanstack/vue-query";
import type { Album } from '@/types/album.ts'
import { type MaybeRefOrGetter, toValue } from 'vue'

export function useSelectAlbumQuery(id: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: ['album', id],
    queryFn: () => selectedAlbum(toValue(id)),
    placeholderData: keepPreviousData,
  })
}

async function selectedAlbum(id: MaybeRefOrGetter<string>): Promise<Album> {
  const url = `/api/library/album/${id}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load data')
  return res.json()
}