import { useEffect, useState } from 'react'
import { getMovie, type Movie } from '../api/tmdb'

type Result = {
  id: number
  movie: Movie | null
  error: string | null
}

export type MovieState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; movie: Movie }
  | { status: 'error'; message: string }

export function useMovie(id: number | null): MovieState {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (id === null) return

    const controller = new AbortController()
    getMovie(id, controller.signal)
      .then((movie) => setResult({ id, movie, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        const message = err instanceof Error ? err.message : 'Unknown error'
        setResult({ id, movie: null, error: message })
      })

    return () => controller.abort()
  }, [id])

  if (id === null) return { status: 'idle' }
  if (result?.id !== id) return { status: 'loading' }
  if (result.error || !result.movie) return { status: 'error', message: result.error ?? 'Unknown error' }
  return { status: 'success', movie: result.movie }
}
