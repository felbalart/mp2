import { Link } from 'react-router'
import { posterUrl, type Movie } from '../api/tmdb'
import RatingStar from './RatingStar'
import { getRating } from '../utils/sortMovies'
import './MovieList.css'

type MovieListItemProps = {
  movie: Movie
}

function MovieListItem({ movie }: MovieListItemProps) {
  const poster = posterUrl(movie.poster_path, 'w154')
  const year = movie.release_date?.slice(0, 4)
  const rating = getRating(movie)

  return (
    <li>
      <Link className="movie-item" to={`/detail/${movie.id}`} state={{ source: 'list' }}>
        {poster ? (
          <img className="movie-poster" src={poster} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="movie-poster movie-poster-empty" aria-hidden="true">
            No image
          </div>
        )}
        <div className="movie-info">
          <h2 className="movie-title">
            {movie.title}
            {year && <span className="movie-year"> ({year})</span>}
          </h2>
          <RatingStar value={rating} />
        </div>
      </Link>
    </li>
  )
}

export default MovieListItem
