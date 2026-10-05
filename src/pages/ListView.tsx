import SearchForm from '../components/SearchForm'
import SortControls from '../components/SortControls'
import MovieList from '../components/MovieList'
import { useMovieSearchContext } from '../context/movieSearchContext'

function ListView() {
  const { query, setQuery, sort, setSort, search, movies } = useMovieSearchContext()

  return (
    <section>
      <h1>List</h1>
      <SearchForm value={query} onChange={setQuery} />
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
