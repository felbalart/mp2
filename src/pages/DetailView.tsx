import { Link, useLocation, useParams } from 'react-router'
import MovieDetail from '../components/MovieDetail'
import MovieNav from '../components/MovieNav'
import { useMovie } from '../hooks/useMovie'
import { useMovieSearchContext } from '../context/movieSearchContext'
import { useGalleryContext } from '../context/galleryContext'

export type DetailSource = 'list' | 'gallery'

function DetailView() {
  const { id } = useParams()
  const location = useLocation()
  const movieId = id && /^\d+$/.test(id) ? Number(id) : null
  const state = useMovie(movieId)
  const { movies: listMovies } = useMovieSearchContext()
  const { movies: galleryMovies } = useGalleryContext()

  const source: DetailSource = (location.state as { source?: DetailSource } | null)?.source ?? 'list'
  const movies = source === 'gallery' ? galleryMovies : listMovies

  if (id && movieId === null) {
    return <p className="list-status error">Invalid movie id.</p>
  }

  return (
    <section>
      {movieId !== null && <MovieNav movies={movies} currentId={movieId} source={source} />}

      {state.status === 'idle' && (
        <>
          <h1>Detail</h1>
          <p className="list-status">
            Pick a movie from the <Link to="/list">List</Link> or the <Link to="/gallery">Gallery</Link> to see its
            details.
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
