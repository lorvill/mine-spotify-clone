import {useQuery, keepPreviousData} from "@tanstack/vue-query";

interface Podcast {
  id: number
  title: string
  subtitle: string
  image: string
}

async function fetchPodcasts(): Promise<Podcast[]> {
  const url = 'https://64e9970736435f75.mokky.dev/podcasts'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch podcasts')
  return res.json()
}

export function usePodcastsQuery() {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: fetchPodcasts,
    placeholderData: keepPreviousData,
  })
}