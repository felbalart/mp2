import { useState } from 'react'
import SearchForm from '../components/SearchForm'
import SortControls from '../components/SortControls'
import MovieList from '../components/MovieList'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { sortMovies, type SortOption } from '../utils/sortMovies'

function ListView() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOption | null>(null)
  const search = useMovieSearch(query)

  const movies = search.status === 'success' ? sortMovies(search.movies, sort) : []

  return (
    <section>
      <h1>List</h1>
      <SearchForm onChange={setQuery} />
      <SortControls value={sort} onChange={setSort} />

      {search.status === 'idle' && <p className="list-status">Type at least 4 characters to search.</p>}
      {search.status === 'loading' && <p className="list-status">Searching…</p>}
      {search.status === 'error' && <p className="list-status error">{search.message}</p>}
      {search.status === 'success' && movies.length === 0 && <p className="list-status">No movies found.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  )
}

export default ListView
