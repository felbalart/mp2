import { useState } from 'react'
import SearchForm from '../components/SearchForm'
import MovieList from '../components/MovieList'
import { useMovieSearch } from '../hooks/useMovieSearch'
import './ListView.css'

function ListView() {
  const [query, setQuery] = useState('')
  const search = useMovieSearch(query)

  return (
    <section>
      <h1>List</h1>
      <SearchForm onChange={setQuery} />

      {search.status === 'idle' && <p className="list-status">Type at least 4 characters to search.</p>}
      {search.status === 'loading' && <p className="list-status">Searching…</p>}
      {search.status === 'error' && <p className="list-status error">{search.message}</p>}
      {search.status === 'success' && search.movies.length === 0 && <p className="list-status">No movies found.</p>}
      {search.status === 'success' && search.movies.length > 0 && <MovieList movies={search.movies} />}
    </section>
  )
}

export default ListView
