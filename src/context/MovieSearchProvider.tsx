import { useMemo, useState, type ReactNode } from 'react'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { sortMovies, type SortOption } from '../utils/sortMovies'
import { MovieSearchContext } from './movieSearchContext'

type MovieSearchProviderProps = {
  children: ReactNode
}

function MovieSearchProvider({ children }: MovieSearchProviderProps) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOption | null>(null)
  const search = useMovieSearch(query)
  const results = search.status === 'success' ? search.movies : null

  const movies = useMemo(() => (results ? sortMovies(results, sort) : []), [results, sort])

  const value = useMemo(
    () => ({ query, setQuery, sort, setSort, search, movies }),
    [query, sort, search, movies],
  )

  return <MovieSearchContext value={value}>{children}</MovieSearchContext>
}

export default MovieSearchProvider
