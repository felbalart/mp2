import GenreFilter from '../components/GenreFilter'
import MovieGrid from '../components/MovieGrid'
import { useGalleryContext } from '../context/galleryContext'

function GalleryView() {
  const { genreId, setGenreId, state, movies } = useGalleryContext()

  return (
    <section>
      <h1>Gallery</h1>
      <GenreFilter value={genreId} onChange={setGenreId} />

      {state.status === 'loading' && <p className="list-status">Loading…</p>}
      {state.status === 'error' && <p className="list-status error">{state.message}</p>}
      {state.status === 'success' && movies.length === 0 && <p className="list-status">No movies found.</p>}
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </section>
  )
}

export default GalleryView
