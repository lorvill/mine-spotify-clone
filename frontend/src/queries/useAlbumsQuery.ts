import {useQuery, keepPreviousData} from "@tanstack/vue-query";

interface Albums {
  id: number | string
  title: string
  subtitle: string
  image: string
}

async function fetchAlbums(): Promise<Albums[]> {
  const url = 'https://64e9970736435f75.mokky.dev/library-albums'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch albums')
  return res.json()
}

export function useAlbumsQuery() {
  return useQuery({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
    placeholderData: keepPreviousData,
  })
}