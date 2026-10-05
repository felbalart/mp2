import { posterUrl, type Movie } from '../api/tmdb'
import { getRating } from '../utils/sortMovies'
import { formatDate, formatNumber } from '../utils/format'
import './MovieDetail.css'

type MovieDetailProps = {
  movie: Movie
}

function MovieDetail({ movie }: MovieDetailProps) {
  const poster = posterUrl(movie.poster_path, 'w342')

  const rows = [
    { label: 'Release Date', value: formatDate(movie.release_date) },
    { label: 'Vote Average', value: formatNumber(getRating(movie), 2) },
    { label: 'Popularity', value: formatNumber(movie.popularity, 0) },
    { label: 'Is for adults', value: movie.adult ? 'True' : 'False' },
  ]

  return (
    <article className="movie-detail">
      <h1 className="movie-detail-title">{movie.title}</h1>

      {poster ? (
        <img className="movie-detail-poster" src={poster} alt={`${movie.title} poster`} />
      ) : (
        <div className="movie-detail-poster movie-detail-poster-empty" aria-hidden="true">
          No image
        </div>
      )}

      <p className="movie-detail-overview">{movie.overview || 'No overview available.'}</p>

      <table className="movie-detail-table">
        <tbody>
          {rows.map(({ label, value }) => (
            <tr key={label}>
              <th scope="row">{label}:</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}

export default MovieDetail
