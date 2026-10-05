const API_URL = 'https://api.themoviedb.org/3'
const IMAGE_URL = 'https://image.tmdb.org/t/p'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const PAGE_SIZE = 20
const MIN_VOTES_FOR_TOP = 500

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

type PagedResponse = {
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

export function getMovie(id: number, signal?: AbortSignal): Promise<Movie> {
  return tmdbGet(`/movie/${id}`, {}, signal)
}

async function fetchPages(
  path: string,
  params: Record<string, string>,
  limit: number,
  signal?: AbortSignal,
): Promise<Movie[]> {
  const fetchPage = (page: number) => tmdbGet<PagedResponse>(path, { ...params, page: String(page) }, signal)

  const first = await fetchPage(1)
  const pagesNeeded = Math.min(Math.ceil(limit / PAGE_SIZE), first.total_pages)
  const rest = await Promise.all(Array.from({ length: Math.max(pagesNeeded - 1, 0) }, (_, i) => fetchPage(i + 2)))

  const seen = new Set<number>()
  return [first, ...rest]
    .flatMap((page) => page.results)
    .filter((movie) => !seen.has(movie.id) && seen.add(movie.id))
    .slice(0, limit)
}

export function searchMovies(query: string, limit: number, signal?: AbortSignal): Promise<Movie[]> {
  return fetchPages('/search/movie', { query, include_adult: 'false' }, limit, signal)
}

export function getTopRatedMovies(genreId: number | null, limit: number, signal?: AbortSignal): Promise<Movie[]> {
  const params: Record<string, string> = {
    sort_by: 'vote_average.desc',
    'vote_count.gte': String(MIN_VOTES_FOR_TOP),
    include_adult: 'false',
  }
  if (genreId !== null) params.with_genres = String(genreId)

  return fetchPages('/discover/movie', params, limit, signal)
}

export function posterUrl(path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' = 'w154'): string | null {
  return path ? `${IMAGE_URL}/${size}${path}` : null
}
