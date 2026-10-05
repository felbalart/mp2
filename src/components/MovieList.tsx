import type { Movie } from '../api/tmdb'
import MovieListItem from './MovieListItem'
import './MovieList.css'

type MovieListProps = {
  movies: Movie[]
}

function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}

export default MovieList
