const API_URL = 'https://api.themoviedb.org/3'
const IMAGE_URL = 'https://image.tmdb.org/t/p'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const PAGE_SIZE = 20

export type Movie = {
  id: number
  title: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
}

type SearchResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

async function tmdbGet<T>(path: string, params: Record<string, string>, signal?: AbortSignal): Promise<T> {
  if (!TOKEN) throw new Error('Missing VITE_TMDB_TOKEN in .env.local')

  const response = await fetch(`${API_URL}${path}?${new URLSearchParams(params)}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
    signal,
  })

  if (response.status === 404) throw new Error('Movie not found')
  if (!response.ok) throw new Error(`TMDB error ${response.status}`)

  return response.json()
}

function fetchSearchPage(query: string, page: number, signal?: AbortSignal): Promise<SearchResponse> {
  return tmdbGet('/search/movie', { query, include_adult: 'false', page: String(page) }, signal)
}

export function getMovie(id: number, signal?: AbortSignal): Promise<Movie> {
  return tmdbGet(`/movie/${id}`, {}, signal)
}

export async function searchMovies(query: string, limit: number, signal?: AbortSignal): Promise<Movie[]> {
  const first = await fetchSearchPage(query, 1, signal)
  const pagesNeeded = Math.min(Math.ceil(limit / PAGE_SIZE), first.total_pages)

  const rest = await Promise.all(
    Array.from({ length: pagesNeeded - 1 }, (_, i) => fetchSearchPage(query, i + 2, signal)),
  )

  const seen = new Set<number>()
  return [first, ...rest]
    .flatMap((page) => page.results)
    .filter((movie) => !seen.has(movie.id) && seen.add(movie.id))
    .slice(0, limit)
}

export function posterUrl(path: string | null, size: 'w92' | 'w154' | 'w342' | 'w500' = 'w154'): string | null {
  return path ? `${IMAGE_URL}/${size}${path}` : null
}
