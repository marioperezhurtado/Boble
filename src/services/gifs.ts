import type Gif from '@/types/giphy'

const apiKey = import.meta.env.VITE_APP_GIPHY_API_KEY

export async function getTrendingGifs() {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`
  )
  const data = await res.json()
  return data.data as Gif[]
}

export async function getSearchGifs(query: string) {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25`
  )
  const data = await res.json()
  return data.data as Gif[]
}
