import { Link } from 'react-router'
import { posterUrl, type Movie } from '../api/tmdb'
import './MovieGrid.css'

type MovieGridProps = {
  movies: Movie[]
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <ul className="movie-grid">
      {movies.map((movie) => {
        const poster = posterUrl(movie.poster_path, 'w185')
        return (
          <li key={movie.id}>
            <Link className="movie-grid-item" to={`/detail/${movie.id}`} state={{ source: 'gallery' }} title={movie.title}>
              {poster ? (
                <img src={poster} alt={movie.title} loading="lazy" />
              ) : (
                <span className="movie-grid-empty">{movie.title}</span>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default MovieGrid
