import { createContext, useContext } from 'react'
import type { Movie } from '../api/tmdb'
import type { MovieSearchState } from '../hooks/useMovieSearch'
import type { SortOption } from '../utils/sortMovies'

export type MovieSearchContextValue = {
  query: string
  setQuery: (query: string) => void
  sort: SortOption | null
  setSort: (sort: SortOption | null) => void
  search: MovieSearchState
  movies: Movie[]
}

export const MovieSearchContext = createContext<MovieSearchContextValue | null>(null)

export function useMovieSearchContext(): MovieSearchContextValue {
  const value = useContext(MovieSearchContext)
  if (!value) throw new Error('useMovieSearchContext must be used inside <MovieSearchProvider>')
  return value
}
