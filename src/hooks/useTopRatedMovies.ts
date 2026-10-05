import { useEffect, useMemo, useState } from 'react'
import { getTopRatedMovies, type Movie } from '../api/tmdb'

const LIMIT = 50

type Result = {
  genreId: number | null
  movies: Movie[]
  error: string | null
}

export type TopRatedState =
  | { status: 'loading' }
  | { status: 'success'; movies: Movie[] }
  | { status: 'error'; message: string }

export function useTopRatedMovies(genreId: number | null): TopRatedState {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getTopRatedMovies(genreId, LIMIT, controller.signal)
      .then((movies) => setResult({ genreId, movies, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        const message = err instanceof Error ? err.message : 'Unknown error'
        setResult({ genreId, movies: [], error: message })
      })

    return () => controller.abort()
  }, [genreId])

  return useMemo<TopRatedState>(() => {
    if (!result || result.genreId !== genreId) return { status: 'loading' }
    if (result.error) return { status: 'error', message: result.error }
    return { status: 'success', movies: result.movies }
  }, [genreId, result])
}
