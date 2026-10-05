import { useEffect, useState } from 'react'
import { searchMovies, type Movie } from '../api/tmdb'

const MIN_LENGTH = 4
const DEBOUNCE_MS = 300
const LIMIT = 50

type Result = {
  query: string
  movies: Movie[]
  error: string | null
}

export type MovieSearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; movies: Movie[] }
  | { status: 'error'; message: string }

export function useMovieSearch(rawQuery: string): MovieSearchState {
  const [result, setResult] = useState<Result | null>(null)
  const trimmed = rawQuery.trim()
  const query = trimmed.length >= MIN_LENGTH ? trimmed : ''

  useEffect(() => {
    if (!query) return

    const controller = new AbortController()
    const timer = setTimeout(() => {
      searchMovies(query, LIMIT, controller.signal)
        .then((movies) => setResult({ query, movies, error: null }))
        .catch((err: unknown) => {
          if (controller.signal.aborted) return
          const message = err instanceof Error ? err.message : 'Unknown error'
          setResult({ query, movies: [], error: message })
        })
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  if (!query) return { status: 'idle' }
  if (result?.query !== query) return { status: 'loading' }
  if (result.error) return { status: 'error', message: result.error }
  return { status: 'success', movies: result.movies }
}
