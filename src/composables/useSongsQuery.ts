import {useQuery, keepPreviousData} from "@tanstack/vue-query";

interface Songs {
  id: number
  title: string
  subtitle: string
  image: string
}

async function fetchSongs(): Promise<Songs[]> {
  const url = 'https://64e9970736435f75.mokky.dev/new-releases'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch new releases')
  return res.json()
}

export function useSongsQuery() {
  return useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
    placeholderData: keepPreviousData,
  })
}