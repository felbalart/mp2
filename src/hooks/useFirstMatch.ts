import { useEffect, useState } from 'react'
import { searchMovies } from '../api/tmdb'

const MIN_LENGTH = 4
const DEBOUNCE_MS = 300

type Result = {
  query: string
  title: string | null
  error: string | null
}

export type FirstMatchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; title: string }
  | { status: 'not-found' }
  | { status: 'error'; message: string }

export function useFirstMatch(rawQuery: string): FirstMatchState {
  const [result, setResult] = useState<Result | null>(null)
  const trimmed = rawQuery.trim()
  const query = trimmed.length >= MIN_LENGTH ? trimmed : ''

  useEffect(() => {
    if (!query) return

    const controller = new AbortController()
    const timer = setTimeout(() => {
      searchMovies(query, controller.signal)
        .then((movies) => {
          const needle = query.toLowerCase()
          const match = movies.find((movie) => movie.title.toLowerCase().includes(needle))
          setResult({ query, title: match?.title ?? null, error: null })
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return
          const message = err instanceof Error ? err.message : 'Unknown error'
          setResult({ query, title: null, error: message })
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
  if (result.title) return { status: 'found', title: result.title }
  return { status: 'not-found' }
}
