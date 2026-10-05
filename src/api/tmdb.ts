const API_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

export type Movie = {
  id: number
  title: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string | null
  vote_average: number
}

type SearchResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export async function searchMovies(query: string, signal?: AbortSignal): Promise<Movie[]> {
  if (!TOKEN) throw new Error('Missing VITE_TMDB_TOKEN in .env.local')

  const params = new URLSearchParams({ query, include_adult: 'false' })
  const response = await fetch(`${API_URL}/search/movie?${params}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) throw new Error(`TMDB error ${response.status}`)

  const data: SearchResponse = await response.json()
  return data.results
}
