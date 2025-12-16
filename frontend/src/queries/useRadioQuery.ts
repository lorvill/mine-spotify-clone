import {useQuery, keepPreviousData} from "@tanstack/vue-query";

interface Radio {
  id: number
  title: string
  subtitle: string
  image: string
}

async function fetchRadio(): Promise<Radio[]> {
  const url = 'https://64e9970736435f75.mokky.dev/radio'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch radio stations')
  return res.json()
}

export function useRadioQuery() {
  return useQuery({
    queryKey: ['radio'],
    queryFn: fetchRadio,
    placeholderData: keepPreviousData,
  })
}