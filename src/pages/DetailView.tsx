import { Link, useParams } from 'react-router'
import MovieDetail from '../components/MovieDetail'
import MovieNav from '../components/MovieNav'
import { useMovie } from '../hooks/useMovie'
import { useMovieSearchContext } from '../context/movieSearchContext'

function DetailView() {
  const { id } = useParams()
  const movieId = id && /^\d+$/.test(id) ? Number(id) : null
  const state = useMovie(movieId)
  const { movies } = useMovieSearchContext()

  if (id && movieId === null) {
    return <p className="list-status error">Invalid movie id.</p>
  }

  return (
    <section>
      {movieId !== null && <MovieNav movies={movies} currentId={movieId} />}

      {state.status === 'idle' && (
        <>
          <h1>Detail</h1>
          <p className="list-status">
            Pick a movie from the <Link to="/list">List</Link> to see its details.
          </p>
        </>
      )}
      {state.status === 'loading' && <p className="list-status">Loading…</p>}
      {state.status === 'error' && <p className="list-status error">{state.message}</p>}
      {state.status === 'success' && <MovieDetail movie={state.movie} />}
    </section>
  )
}

export default DetailView
